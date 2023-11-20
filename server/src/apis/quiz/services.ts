import { Request, Response } from 'express';
import { database } from '../../configs';
import { StatusCodes } from 'http-status-codes';
import { createApiResponse } from '../../utils/response';
interface Answer {
  answer: string;
  answerDescription?: string;
  isRightAnswer: boolean;
}

interface Question {
  question: string;
  answers: Answer[];
}

interface NewQuizData {
  studentId: string;
  title: string;
  questions: Question[];
}
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
async function findQuizById(req: Request, res: Response) {}

/**
 * ________________________________________________________________
 * @route api/v1/quiz
 * @method POST
 * @access protected
 * ________________________________________________________________
 */
async function createQuiz(req: Request, res: Response) {
  const { title, studentId } = req.body;

  const quiz = await database.quiz.create({
    data: {
      studentId,
      title
    }
  });

  res.status(StatusCodes.OK).json(createApiResponse(StatusCodes.OK, '', quiz));
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

export { findAllQuizzes, findQuizById, createQuiz, updateQuiz, deleteQuiz };
