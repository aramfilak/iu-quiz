import { Router } from 'express';
import {
  findAllQuizzes,
  findQuizById,
  createQuiz,
  createQuizQuestion,
  updateQuiz,
  deleteQuizById
} from './services';
import { authenticate } from '../../middlewares/authenticate';

const quizRoutes = Router();

quizRoutes.get('/', findAllQuizzes);
quizRoutes.get('/:quizId', findQuizById);
quizRoutes.delete('/:quizId', authenticate, deleteQuizById);
quizRoutes.post('/', authenticate, createQuiz);
quizRoutes.post('/question', authenticate, createQuizQuestion);

export { quizRoutes };
