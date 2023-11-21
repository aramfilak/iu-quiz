import { Router } from 'express';
import {
  findAllQuizzes,
  findQuizById,
  createQuiz,
  createQuizQuestion,
  updateQuiz,
  deleteQuiz
} from './services';
import { authenticate } from '../../middlewares/authenticate';

const quizRoutes = Router();

quizRoutes.get('/', findAllQuizzes);
quizRoutes.get('/:quizId', findQuizById);
quizRoutes.post('/', authenticate, createQuiz);
quizRoutes.post('/question', authenticate, createQuizQuestion);

export { quizRoutes };
