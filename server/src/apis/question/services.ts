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
 * @route api/v1/quiz/question
 * @method POST
 * @access protected
 * ________________________________________________________________
 */
async function createQuizQuestion(
  req: Request<any, any, QuizQuestionData>,
  res: Response
) {
  const studentId = req.auth?.studentId;
  let { quizId, question, quizAnswers } = req.body;

  const student = await db.student.findUnique({ where: { id: studentId } });

  if (!student) {
    throw new UnauthorizedError('Sie sind nicht berechtigt');
  }

  validate.isEmpty('Quiz Id', quizId);
  question = validate.isEmpty('Question', question);
  validate.min('Answers', quizAnswers, 2);
  validate.max('Answers', quizAnswers, 4);

  const existingQuiz = await db.quiz.findUnique({
    where: {
      id: Number(quizId),
      authorId: studentId
    }
  });

  if (!existingQuiz) {
    throw new NotFoundError('Quiz nicht gefunden');
  }

  for (const [index, answer] of quizAnswers.entries()) {
    quizAnswers[index].answer = validate.isEmpty('Answer', answer.answer);
    quizAnswers[index].answerDescription?.trim();
    quizAnswers[index].isRightAnswer = validate.isEmpty(
      'Is Right Answer',
      answer.isRightAnswer
    );
  }

  await db.quizQuestion.create({
    data: {
      authorId: student.id,
      quizId: existingQuiz.id,
      question: question,
      quizAnswers: {
        createMany: {
          data: quizAnswers
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

  res.status(StatusCodes.CREATED).json(createApiResponse(StatusCodes.CREATED, ''));
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
  let { quizId, question, quizAnswers } = req.body;
  const questionId = req.params.questionId;

  const student = await db.student.findUnique({ where: { id: studentId } });

  if (!student) {
    throw new UnauthorizedError('Sie sind nicht berechtigt');
  }

  validate.isEmpty('Quiz Id', quizId);
  question = validate.isEmpty('Question', question);
  validate.min('Answers', quizAnswers, 2);
  validate.max('Answers', quizAnswers, 4);

  const existingQuestion = await db.quizQuestion.findUnique({
    where: {
      id: Number(questionId),
      quizId: Number(quizId),
      authorId: student.id
    }
  });

  if (!existingQuestion) {
    throw new NotFoundError('Frage nicht gefunden');
  }

  const answers = [];

  for (const answer of quizAnswers) {
    validate.isEmpty('Ist Richtiger Antwort', answer.isRightAnswer);
    validate.isEmpty('Antwort', answer.answer);
    answers.push({
      id: answer.id,
      answer: answer.answer.trim(),
      answerDescription: answer.answerDescription?.trim(),
      isRightAnswer: answer.isRightAnswer
    });
  }

  await db.quizQuestion.update({
    where: {
      id: existingQuestion.id
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

  res.status(StatusCodes.OK).json(createApiResponse(StatusCodes.OK, ''));
}

/**
 * ________________________________________________________________
 * @route api/v1/quiz/question
 * @method DELETE
 * @access protected
 * ________________________________________________________________
 */
async function deleteQuestionById(req: Request, res: Response) {
  const studentId = req.auth?.studentId;
  const { questionId, quizId } = req.query;

  const student = await db.student.findUnique({ where: { id: studentId } });

  if (!student) {
    throw new UnauthorizedError('Sie sind nicht berechtigt');
  }

  const existingQuizAndQuestion = await db.quiz.findUnique({
    where: {
      id: Number(quizId),
      authorId: student.id
    },
    include: {
      quizQuestions: {
        where: { id: Number(questionId) }
      }
    }
  });
  if (!existingQuizAndQuestion) {
    throw new NotFoundError('Frage nicht gefunden');
  }

  await db.quizQuestion.delete({
    where: {
      id: existingQuizAndQuestion.id
    }
  });

  await db.quiz.update({
    where: {
      authorId: student.id,
      id: Number(quizId)
    },
    data: { size: existingQuizAndQuestion.size - 1 }
  });

  res.status(StatusCodes.OK).json(createApiResponse(StatusCodes.OK, ''));
}

export { createQuizQuestion, updateQuizQuestion, deleteQuestionById };
