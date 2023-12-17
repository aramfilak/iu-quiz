import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { db } from '../../configs';
import { UnauthorizedError, NotFoundError } from '../../errors';
import { createApiResponse } from '../../utils/response';
import { validate } from '../../utils/validate';
import { QuizAnswer } from '@prisma/client';

interface QuizQuestionData {
  quizId: string;
  question: string;
  quizAnswers: QuizAnswer[];
}

/**
 * ________________________________________________________________
 * @route api/v1/quiz/feedback
 * @method POST
 * @access protected
 * ________________________________________________________________
 */
async function createFeedback(req: Request, res: Response) {
  const studentId = req.auth?.studentId;
  let { quizId, feedback } = req.body;

  const student = await db.student.findUnique({ where: { id: studentId } });

  if (!student) {
    throw new UnauthorizedError('Sie sind nicht berechtigt');
  }

  quizId = validate.isEmpty('Quiz Id', quizId);
  feedback = validate.min('Feedback', feedback, 2);

  const existingQuiz = await db.quiz.findUnique({
    where: {
      id: Number(quizId),
      authorId: studentId
    }
  });

  if (!existingQuiz) {
    throw new NotFoundError('Quiz nicht gefunden');
  }

  await db.quizFeedback.create({
    data: {
      authorId: student.id,
      quizId: existingQuiz.id,
      feedback: feedback
    }
  });

  res.status(StatusCodes.CREATED).json(createApiResponse(StatusCodes.CREATED, ''));
}

/**
 * ________________________________________________________________
 * @route api/v1/quiz/feedback
 * @method PATCH
 * @access protected
 * ________________________________________________________________
 */
async function updateFeedback(req: Request, res: Response) {
  const studentId = req.auth?.studentId;
  let { quizId, feedback, feedbackId } = req.body;

  const student = await db.student.findUnique({ where: { id: studentId } });

  if (!student) {
    throw new UnauthorizedError('Sie sind nicht berechtigt');
  }

  quizId = validate.isEmpty('Quiz Id', quizId);
  feedbackId = validate.isEmpty('Feedback Id', feedbackId);
  feedback = validate.min('Feedback', feedback, 2);

  const existingFeedback = await db.quizFeedback.findUnique({
    where: {
      id: Number(feedbackId),
      quizId: Number(quizId),
      authorId: student.id
    }
  });

  if (!existingFeedback) {
    throw new NotFoundError('Feedback nicht gefunden');
  }

  await db.quizFeedback.update({
    where: {
      id: existingFeedback.id
    },
    data: {
      feedback: feedback
    }
  });

  res.status(StatusCodes.OK).json(createApiResponse(StatusCodes.OK, ''));
}

/**
 * ________________________________________________________________
 * @route api/v1/quiz/feedback
 * @method DELETE
 * @access protected
 * ________________________________________________________________
 */
async function deleteFeedback(req: Request, res: Response) {
  const studentId = req.auth?.studentId;
  let { feedbackId, quizId } = req.query;

  const student = await db.student.findUnique({ where: { id: studentId } });

  if (!student) {
    throw new UnauthorizedError('Sie sind nicht berechtigt');
  }

  quizId = validate.isEmpty('Quiz Id', quizId);
  feedbackId = validate.isEmpty('Feedback Id', feedbackId);

  const existingFeedback = await db.quizFeedback.findUnique({
    where: {
      id: Number(feedbackId),
      quizId: Number(quizId),
      authorId: student.id
    }
  });

  if (!existingFeedback) {
    throw new NotFoundError('Feedback nicht gefunden');
  }

  await db.quizFeedback.delete({
    where: {
      id: Number(feedbackId),
      quizId: Number(quizId),
      authorId: student.id
    }
  });

  res.status(StatusCodes.OK).json(createApiResponse(StatusCodes.OK, ''));
}

export { createFeedback, updateFeedback, deleteFeedback };
