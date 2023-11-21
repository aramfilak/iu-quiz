import { Request, Response } from 'express';
import { database } from '../../configs';
import { StatusCodes } from 'http-status-codes';
import { createApiResponse } from '../../utils/response';
import { BadRequestError } from '../../errors';
import { QuizAnswer } from '@prisma/client';

/**
 * ________________________________________________________________
 * @route api/v1/quiz
 * @method GET
 * @access public
 * ________________________________________________________________
 */
async function findAllQuizzes(req: Request, res: Response) {}

/**
 * ________________________________________________________________
 * @route api/v1/quiz/:quizId
 * @method GET
 * @access public
 * ________________________________________________________________
 */
async function findQuizById(req: Request, res: Response) {
  const quizId = req.params.quizId;

  const quiz = await database.quiz.findUnique({
    where: { id: parseInt(quizId) },
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
  const { title, courseOfStudy } = req.body;

  const quiz = await database.quiz.create({
    data: {
      student: {
        connect: {
          id: studentId
        }
      },
      title,
      courseOfStudy
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
  const { quizId, question, answers } = req.body;

  const existingQuiz = await database.quiz.findUnique({
    where: {
      id: quizId
    }
  });

  if (!existingQuiz) {
    throw new BadRequestError('Quiz nicht gefunden');
  }

  const createdQuestion = await database.quizQuestion.create({
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

  await database.quiz.update({
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
async function deleteQuiz(req: Request, res: Response) {}

export { findAllQuizzes, findQuizById, createQuiz, createQuizQuestion, updateQuiz, deleteQuiz };
