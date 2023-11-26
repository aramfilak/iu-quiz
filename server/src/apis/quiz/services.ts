import { Request, Response } from 'express';
import { db } from '../../configs';
import { StatusCodes } from 'http-status-codes';
import { createApiResponse } from '../../utils/response';
import { BadRequestError, UnauthorizedError } from '../../errors';
import { validate } from '../../utils/validate';

/**
 * ________________________________________________________________
 * @route api/v1/quiz
 * @method GET
 * @access protected
 * ________________________________________________________________
 */
async function findAllQuizzes(req: Request, res: Response) {
  const studentId = req.auth?.studentId;
  const { page, limit, createdAt, updatedAt, popularity, size, courseOfStudy, courseId, sort } =
    req.query;

  const student = await db.student.findUnique({ where: { id: studentId } });

  if (!student) {
    throw new UnauthorizedError('Sie sind nicht berechtigt');
  }

  const where: any = {};
  const sortOrder = sort ? sort : 'asc';

  if (courseOfStudy) {
    where.courseOfStudy = courseOfStudy;
  }

  if (courseId) {
    where.courseId = courseId;
  }

  const orderBy: any = [];

  if (createdAt) {
    orderBy.push({ createdAt: sortOrder });
  }

  if (updatedAt) {
    orderBy.push({ updatedAt: sortOrder });
  }

  if (size) {
    orderBy.push({ size: sortOrder });
  }

  if (popularity) {
    orderBy.push({ popularity: sortOrder });
  }

  const skip = (Number(page) - 1 || 0) * (Number(limit) || 10);
  const take = Number(limit) || 10;

  const quizzes = await db.quiz.findMany({
    where: where,
    include: {
      quizQuestions: {
        include: {
          quizAnswers: true
        }
      }
    },
    orderBy,
    skip,
    take
  });
  res.status(StatusCodes.OK).json(createApiResponse(StatusCodes.OK, 'Quiz erstellt', quizzes));
}

/**
 * ________________________________________________________________
 * @route api/v1/quiz/:quizId
 * @method GET
 * @access protected
 * ________________________________________________________________
 */
async function findQuizById(req: Request, res: Response) {
  const studentId = req.auth?.studentId;
  const quizId = req.params.quizId;

  const student = await db.student.findUnique({ where: { id: studentId } });

  if (!student) {
    throw new UnauthorizedError('Sie sind nicht berechtigt');
  }

  const quiz = await db.quiz.findUnique({
    where: { id: Number(quizId) },
    include: {
      quizQuestions: {
        include: {
          quizAnswers: true
        }
      }
    }
  });

  if (!quiz) {
    throw new BadRequestError('Quiz nicht gefunden');
  }

  res.status(StatusCodes.OK).json(createApiResponse(StatusCodes.OK, 'Quiz erstellt', quiz));
}

/**
 * ________________________________________________________________
 * @route api/v1/quiz
 * @method POST
 * @access protected
 * ________________________________________________________________
 */
async function createQuiz(req: Request, res: Response) {
  const studentId = req.auth?.studentId;
  const { title, courseOfStudy, courseId } = req.body;

  const student = await db.student.findUnique({ where: { id: studentId } });

  if (!student) {
    throw new UnauthorizedError('Sie sind nicht berechtigt');
  }

  validate.isEmpty('Title', title);
  validate.isEmpty('Course of study', courseOfStudy);
  validate.isEmpty('Course id', courseId);

  const quiz = await db.quiz.create({
    data: {
      authorId: student.id,
      title,
      courseOfStudy,
      courseId
    }
  });

  res.status(StatusCodes.OK).json(createApiResponse(StatusCodes.OK, '', quiz));
}
/**
 * ________________________________________________________________
 * @route api/v1/quiz/question
 * @method POST
 * @access protected
 * ________________________________________________________________
 */
async function createQuizQuestion(req: Request, res: Response) {
  const studentId = req.auth?.studentId;
  const { quizId, question, answers } = req.body;

  const student = await db.student.findUnique({ where: { id: studentId } });

  if (!student) {
    throw new UnauthorizedError('Sie sind nicht berechtigt');
  }

  validate.isEmpty('Quiz Id', quizId);
  validate.isEmpty('Question', question);
  validate.isEmpty('Answers', answers);

  const existingQuiz = await db.quiz.findUnique({
    where: {
      id: quizId,
      authorId: student.id
    }
  });

  if (!existingQuiz) {
    throw new BadRequestError('Quiz existiert nicht');
  }

  const createdQuestion = await db.quizQuestion.create({
    data: {
      quiz: { connect: { id: quizId } },
      question,
      quizAnswers: {
        createMany: {
          data: answers
        }
      }
    },
    include: {
      quizAnswers: true
    }
  });

  await db.quiz.update({
    where: {
      id: quizId
    },
    data: { size: existingQuiz.size + 1 }
  });

  res
    .status(StatusCodes.OK)
    .json(createApiResponse(StatusCodes.OK, 'Quiz erstellt', createdQuestion));
}

/**
 * ________________________________________________________________
 * @route api/v1/quiz
 * @method PATCH
 * @access protected
 * ________________________________________________________________
 */
async function updateQuiz(req: Request, res: Response) {}

/**
 * ________________________________________________________________
 * @route api/v1/quiz
 * @method DELETE
 * @access protected
 * ________________________________________________________________
 */
async function deleteQuizById(req: Request, res: Response) {
  const studentId = req.auth?.studentId;
  const quizId = req.params.quizId;

  const student = await db.student.findUnique({ where: { id: studentId } });

  if (!student) {
    throw new UnauthorizedError('Sie sind nicht berechtigt');
  }

  await db.quiz.delete({
    where: {
      id: Number(quizId),
      authorId: student.id
    }
  });

  res.status(StatusCodes.OK).json(createApiResponse(StatusCodes.OK, 'Quiz gelöscht'));
}

/**
 * ________________________________________________________________
 * @route api/v1/quiz/follow/:quizId
 * @method POST
 * @access protected
 * ________________________________________________________________
 */
async function followQuiz(req: Request, res: Response) {
  const studentId = req.auth?.studentId;
  const quizId = req.params.quizId;

  validate.isEmpty('Quiz Id', quizId);

  const student = await db.student.findUnique({ where: { id: studentId } });

  if (!student) {
    throw new UnauthorizedError('Sie sind nicht berechtigt');
  }

  const existingQuiz = await db.quiz.findUnique({
    where: {
      id: Number(quizId)
    }
  });

  if (!existingQuiz) {
    throw new BadRequestError('Quiz existiert nicht');
  }

  if (student.id === existingQuiz.authorId) {
    throw new BadRequestError('Sie können Ihrem eigenen Quiz nicht folgen');
  }

  const isFollowed = await db.followedQuizzes.findUnique({
    where: { followerId_quizId: { followerId: student.id, quizId: Number(existingQuiz.id) } }
  });

  if (isFollowed) {
    throw new BadRequestError('Quiz ist bereits gefolgt');
  }

  await db.followedQuizzes.create({
    data: { followerId: student.id, quizId: existingQuiz.id }
  });

  res.status(StatusCodes.OK).json(createApiResponse(StatusCodes.OK, ''));
}

/**
 * ________________________________________________________________
 * @route api/v1/quiz/follow/:quizId
 * @method DELETE
 * @access protected
 * ________________________________________________________________
 */
async function unFollowQuiz(req: Request, res: Response) {
  const studentId = req.auth?.studentId;
  const quizId = req.params.quizId;

  const student = await db.student.findUnique({ where: { id: studentId } });

  if (!student) {
    throw new UnauthorizedError('Sie sind nicht berechtigt');
  }

  const isFollowed = await db.followedQuizzes.findUnique({
    where: { followerId_quizId: { followerId: student.id, quizId: Number(quizId) } }
  });

  if (!isFollowed) {
    throw new BadRequestError('Quiz ist nicht gefolgt');
  }

  await db.followedQuizzes.delete({
    where: { followerId_quizId: { followerId: student.id, quizId: Number(quizId) } }
  });

  res.status(StatusCodes.OK).json(createApiResponse(StatusCodes.OK, ''));
}

export {
  findAllQuizzes,
  findQuizById,
  createQuiz,
  createQuizQuestion,
  updateQuiz,
  deleteQuizById,
  followQuiz,
  unFollowQuiz
};
