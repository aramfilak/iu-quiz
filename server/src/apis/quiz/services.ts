import { Request, Response } from 'express';
import { db } from '../../configs';
import { StatusCodes } from 'http-status-codes';
import { createApiResponse } from '../../utils/response';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../../errors';
import { validate } from '../../utils/validate';
import { FollowedQuizzes, Quiz } from '@prisma/client';
import { calculateScore, getMinScore } from '../../utils/helpers';

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
    searchTerm,
    limit,
    updatedAt,
    likes,
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

  if (searchTerm) {
    where.title = { contains: String(searchTerm).trim() };
  }

  const orderBy: any = [];

  if (updatedAt === 'true') {
    orderBy.push({ updatedAt: sortOrder });
  }

  if (size === 'true') {
    orderBy.push({ size: sortOrder });
  }

  if (likes === 'true') {
    orderBy.push({ likes: sortOrder });
  }

  const totalQuizzesCount = await db.quiz.count({
    where: where
  });

  const MAX_ITEMS_PER_PAGE = 20;
  const totalPages = Math.ceil(totalQuizzesCount / (Number(limit) || MAX_ITEMS_PER_PAGE));
  const skip = (Number(page) - 1 || 0) * (Number(limit) || MAX_ITEMS_PER_PAGE);
  const take = Number(limit) || MAX_ITEMS_PER_PAGE;

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

  res
    .status(StatusCodes.OK)
    .json(createApiResponse(StatusCodes.OK, '', { quizzes, totalPages }));
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
      student: {
        select: {
          studentProfile: {
            select: {
              name: true,
              profileImage: true
            }
          }
        }
      },
      quizQuestions: {
        include: {
          quizAnswers: true
        }
      },
      scores: {
        include: {
          student: {
            select: {
              studentProfile: {
                select: {
                  name: true,
                  profileImage: true
                }
              }
            }
          }
        }
      },
      likedBy: true,
      feedbacks: {
        include: {
          author: {
            select: {
              studentProfile: {
                select: {
                  name: true,
                  profileImage: true
                }
              }
            }
          }
        }
      }
    }
  });

  if (!quiz) {
    throw new BadRequestError('Quiz nicht gefunden');
  }

  quiz.scores.sort((a, b) => b.score - a.score);

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
  let { title, courseOfStudy, course } = req.body;

  const student = await db.student.findUnique({ where: { id: studentId } });

  if (!student) {
    throw new UnauthorizedError('Sie sind nicht berechtigt');
  }

  validate.min('Title', title, 3);
  title = validate.max('Title', title, 50);
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
    updateData.title = validate.max('Title', title, 50);
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
    where: { authorId: existingQuiz.authorId, id: existingQuiz.id },
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

  const existingQuiz = await db.quiz.findUnique({
    where: {
      id: Number(quizId),
      authorId: studentId
    }
  });

  if (!existingQuiz) {
    throw new NotFoundError('Quiz nicht gefunden');
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
 * @route api/v1/quiz/toggle-follow/:quizId
 * @method POST
 * @access protected
 * ________________________________________________________________
 */
async function toggleFollowQuiz(req: Request, res: Response) {
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
    await db.followedQuizzes.delete({
      where: { followerId_quizId: { followerId: student.id, quizId: Number(quizId) } }
    });
  } else {
    await db.followedQuizzes.create({
      data: { followerId: student.id, quizId: existingQuiz.id }
    });
  }

  res.status(StatusCodes.OK).json(createApiResponse(StatusCodes.OK, ''));
}

/**
 * ________________________________________________________________
 * @route api/v1/quiz/score/:quizId
 * @method PATCH
 * @access protected
 * ________________________________________________________________
 */
async function updateQuizScores(req: Request, res: Response) {
  const studentId = req.auth?.studentId;
  const quizId = req.params.quizId;
  const { correctAnswers, takenTime, totalQuestions } = req.body;

  validate.isEmpty('Number Of Correct Answers', correctAnswers);
  validate.isEmpty('Time taken', takenTime);

  const student = await db.student.findUnique({ where: { id: studentId } });

  if (!student) {
    throw new UnauthorizedError('Sie sind nicht berechtigt');
  }

  const existingQuiz = await db.quiz.findUnique({
    where: {
      id: Number(quizId)
    },
    include: {
      scores: true
    }
  });

  if (!existingQuiz) {
    throw new BadRequestError('Quiz existiert nicht');
  }

  const scores = existingQuiz.scores;
  const newScore = calculateScore(correctAnswers, totalQuestions, takenTime);

  if (scores.length > 10) {
    const worstScore = getMinScore(scores);

    if (newScore >= worstScore.score && studentId !== worstScore.playerId) {
      await db.quizScore.delete({ where: { id: worstScore.id } });
    } else if (newScore >= worstScore.score && studentId === worstScore.playerId) {
      await db.quizScore.update({
        where: { id: worstScore.id },
        data: { takenTime, correctAnswers }
      });
    }
  } else {
    await db.quizScore.create({
      data: {
        quizId: existingQuiz.id,
        playerId: studentId,
        score: newScore,
        takenTime,
        correctAnswers,
        totalQuestions
      }
    });
  }

  res.status(StatusCodes.OK).json(createApiResponse(StatusCodes.OK, ''));
}

/**
 * ________________________________________________________________
 * @route api/v1/quiz/toggle-like/:quizId
 * @method POST
 * @access protected
 * ________________________________________________________________
 */
async function toggleLikeQuiz(req: Request, res: Response) {
  const studentId = req.auth?.studentId;
  const { quizId } = req.params;

  const student = await db.student.findUnique({ where: { id: studentId } });

  if (!student) {
    throw new UnauthorizedError('Sie sind nicht berechtigt');
  }

  const existingQuiz = await db.quiz.findUnique({
    where: { id: Number(quizId) }
  });

  if (!existingQuiz) {
    throw new BadRequestError('Quiz existiert nicht');
  }

  const existingLikeId = {
    playerId_quizId: { quizId: existingQuiz.id, playerId: student.id }
  };

  const existingLike = await db.likedQuiz.findUnique({
    where: existingLikeId
  });

  if (existingLike) {
    await db.likedQuiz.delete({
      where: existingLikeId
    });
  } else {
    await db.likedQuiz.create({
      data: {
        quizId: existingQuiz.id,
        playerId: student.id
      }
    });
  }

  const likedByCount = await db.likedQuiz.count({
    where: { quizId: existingQuiz.id }
  });

  await db.quiz.update({
    where: { id: existingQuiz.id },
    data: { likes: likedByCount, updatedAt: existingQuiz.updatedAt }
  });

  res.status(StatusCodes.OK).json(createApiResponse(StatusCodes.OK, ''));
}

export {
  findAllQuizzes,
  findQuizById,
  createQuiz,
  updateQuiz,
  deleteQuizById,
  toggleFollowQuiz,
  toggleLikeQuiz,
  updateQuizScores
};
