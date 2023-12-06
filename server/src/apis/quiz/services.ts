import { Request, Response } from 'express';
import { db } from '../../configs';
import { StatusCodes } from 'http-status-codes';
import { createApiResponse } from '../../utils/response';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../../errors';
import { validate } from '../../utils/validate';
import { FollowedQuizzes, Quiz, QuizAnswer, QuizQuestion } from '@prisma/client';

interface QuizQuestionData {
  quizId: string;
  question: string;
  answers: QuizAnswer[];
}

/**
 * ________________________________________________________________
 * @route api/v1/quiz
 * @method GET
 * @access protected
 * ________________________________________________________________
 */
async function findAllQuizzes(req: Request, res: Response) {
  const studentId = req.auth?.studentId;
  const {
    page,
    limit,
    updatedAt,
    popularity,
    size,
    courseOfStudy,
    course,
    sort,
    authorId,
    followed,
    unFollowed
  } = req.query;

  const student = await db.student.findUnique({ where: { id: studentId } });

  if (!student) {
    throw new UnauthorizedError('Sie sind nicht berechtigt');
  }

  const where: any = {};
  const sortOrder = sort ? sort : 'asc';

  if (authorId) {
    where.authorId = authorId;
  }

  if (courseOfStudy) {
    where.courseOfStudy = courseOfStudy;
  }

  if (course) {
    where.course = course;
  }

  if (followed === 'true') {
    const followedQuizzes = await db.followedQuizzes.findMany({
      where: { followerId: studentId },
      include: { quiz: true }
    });

    const followedQuizzesIds = followedQuizzes.map(
      ({ quizId }: FollowedQuizzes) => quizId
    );

    where.id = { in: followedQuizzesIds };
  }

  if (unFollowed === 'true') {
    const followedQuizzes = await db.followedQuizzes.findMany({
      where: { followerId: studentId },
      include: { quiz: true }
    });

    const followedQuizzesIds = followedQuizzes.map(
      ({ quizId }: FollowedQuizzes) => quizId
    );

    where.id = { notIn: followedQuizzesIds };
    where.authorId = { not: studentId };
  }

  const orderBy: any = [];

  if (updatedAt === 'true') {
    orderBy.push({ updatedAt: sortOrder });
  }

  if (size === 'true') {
    orderBy.push({ size: sortOrder });
  }

  if (popularity === 'true') {
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

  res.status(StatusCodes.OK).json(createApiResponse(StatusCodes.OK, '', quizzes));
}

/**
 * ________________________________________________________________
 * @route api/v1/quiz/:quizId
 * @method GET
 * @access protected
 * ________________________________________________________________
 */
async function findQuizById(req: Request, res: Response) {
  const quizId = req.params.quizId;
  const studentId = req.auth?.studentId;

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

  res.status(StatusCodes.OK).json(createApiResponse(StatusCodes.OK, '', quiz));
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
  const { title, courseOfStudy, course } = req.body;

  const student = await db.student.findUnique({ where: { id: studentId } });

  if (!student) {
    throw new UnauthorizedError('Sie sind nicht berechtigt');
  }

  validate.min('Title', title, 3);
  validate.max('Title', title, 50);
  validate.isEmpty('Course of study', courseOfStudy);
  validate.isEmpty('Course', course);

  const quiz = await db.quiz.create({
    data: {
      authorId: student.id,
      title,
      courseOfStudy,
      course
    }
  });

  res
    .status(StatusCodes.OK)
    .json(createApiResponse(StatusCodes.OK, 'Quiz erstellt', quiz));
}

/**
 * ________________________________________________________________
 * @route api/v1/quiz
 * @method PATCH
 * @access protected
 * ________________________________________________________________
 */
async function updateQuiz(req: Request, res: Response) {
  const studentId = req.auth?.studentId;
  const quizId = req.params.quizId;
  const { title, courseOfStudy, course } = req.body;

  const student = await db.student.findUnique({ where: { id: studentId } });

  if (!student) {
    throw new UnauthorizedError('Sie sind nicht berechtigt');
  }

  const existingQuiz = await db.quiz.findUnique({
    where: {
      id: Number(quizId),
      authorId: studentId
    }
  });

  if (!existingQuiz) {
    throw new NotFoundError('Quiz nicht gefunden');
  }

  const updateData: Partial<Quiz> = {};

  if (title) {
    validate.min('Title', title, 3);
    validate.max('Title', title, 50);
    updateData.title = title;
  }
  if (courseOfStudy) {
    updateData.courseOfStudy = validate.isEmpty('Course of study', courseOfStudy);
  }
  if (course) {
    updateData.course = validate.isEmpty('Course', course);
  }

  if (!Object.keys(updateData).length) {
    throw new BadRequestError('Keine Änderungen vorhanden');
  }

  const updatedQuiz = await db.quiz.update({
    where: { authorId: studentId, id: Number(quizId) },
    data: updateData
  });

  res
    .status(StatusCodes.OK)
    .json(createApiResponse(StatusCodes.OK, 'Änderungen gespeichert', updatedQuiz));
}

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
      authorId: studentId
    }
  });

  res.status(StatusCodes.OK).json(createApiResponse(StatusCodes.OK, ''));
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

  const student = await db.student.findUnique({ where: { id: studentId } });

  if (!student) {
    throw new UnauthorizedError('Sie sind nicht berechtigt');
  }

  validate.isEmpty('Quiz Id', quizId);

  const existingQuiz = await db.quiz.findUnique({
    where: {
      id: Number(quizId)
    }
  });

  if (!existingQuiz) {
    throw new BadRequestError('Quiz existiert nicht');
  }

  if (studentId === existingQuiz.authorId) {
    throw new BadRequestError('Sie können Ihrem eigenen Quiz nicht folgen');
  }

  const isFollowed = await db.followedQuizzes.findUnique({
    where: {
      followerId_quizId: { followerId: student.id, quizId: Number(existingQuiz.id) }
    }
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

/**
 * ________________________________________________________________
 * @route api/v1/quiz/question
 * @method POST
 * @access protected
 * ________________________________________________________________
 */
async function createQuizQuestion(
  req: Request<any, any, { quizId: string; question: string; answers: QuizAnswer[] }>,
  res: Response
) {
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
      id: Number(quizId),
      authorId: studentId
    }
  });

  if (!existingQuiz) {
    throw new NotFoundError('Quiz nicht gefunden');
  }

  for (const answer of answers) {
    validate.isEmpty('Ist Richtiger Antwort', answer.isRightAnswer);
    validate.isEmpty('Antwort', answer.answer);
  }

  const createdQuestion = await db.quizQuestion.create({
    data: {
      authorId: student.id,
      quizId: existingQuiz.id,
      question: question,
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
      authorId: student.id,
      id: Number(quizId)
    },
    data: { size: existingQuiz.size + 1 }
  });

  res
    .status(StatusCodes.CREATED)
    .json(createApiResponse(StatusCodes.CREATED, '', createdQuestion));
}

/**
 * ________________________________________________________________
 * @route api/v1/quiz/question/:questionId
 * @method PATCH
 * @access protected
 * ________________________________________________________________
 */
async function updateQuizQuestion(
  req: Request<any, any, QuizQuestionData>,
  res: Response
) {
  const studentId = req.auth?.studentId;
  const { quizId, question, answers } = req.body;
  const questionId = req.params.questionId;

  const student = await db.student.findUnique({ where: { id: studentId } });

  if (!student) {
    throw new UnauthorizedError('Sie sind nicht berechtigt');
  }

  validate.isEmpty('Quiz Id', quizId);
  validate.isEmpty('Question', question);
  validate.isEmpty('Answers', answers);

  for (const answer of answers) {
    validate.isEmpty('Ist Richtiger Antwort', answer.isRightAnswer);
    validate.isEmpty('Antwort', answer.answer);
  }

  const existingQuestion = await db.quizQuestion.findUnique({
    where: {
      id: Number(questionId),
      quizId: Number(quizId)
    }
  });

  if (!existingQuestion) {
    throw new NotFoundError('Frage nicht gefunden');
  }

  const updatedQuestion = await db.quizQuestion.update({
    where: {
      id: Number(questionId)
    },
    data: {
      question: question,
      quizAnswers: {
        deleteMany: {},
        createMany: {
          data: answers
        }
      }
    },
    include: {
      quizAnswers: true
    }
  });

  res.status(StatusCodes.OK).json(createApiResponse(StatusCodes.OK, '', updatedQuestion));
}

export {
  findAllQuizzes,
  findQuizById,
  createQuiz,
  createQuizQuestion,
  updateQuiz,
  deleteQuizById,
  followQuiz,
  unFollowQuiz,
  updateQuizQuestion
};
