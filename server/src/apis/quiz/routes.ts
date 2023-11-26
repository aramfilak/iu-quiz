import { Router } from 'express';
import {
  findAllQuizzes,
  findQuizById,
  createQuiz,
  createQuizQuestion,
  updateQuiz,
  deleteQuizById,
  followQuiz
} from './services';

const quizRoutes = Router();

quizRoutes.get('/', findAllQuizzes);
quizRoutes.get('/:quizId', findQuizById);
quizRoutes.delete('/:quizId', deleteQuizById);
quizRoutes.post('/', createQuiz);
quizRoutes.post('/question', createQuizQuestion);
quizRoutes.post('/follow-quiz/:quizId', followQuiz);

export { quizRoutes };
