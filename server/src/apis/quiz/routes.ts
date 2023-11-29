import { Router } from 'express';
import {
  findAllQuizzes,
  findQuizById,
  createQuiz,
  createQuizQuestion,
  deleteQuizById,
  followQuiz,
  unFollowQuiz
} from './services';

const quizRoutes = Router();

quizRoutes.get('/', findAllQuizzes);
quizRoutes.get('/:quizId', findQuizById);
quizRoutes.delete('/:quizId', deleteQuizById);
quizRoutes.post('/', createQuiz);
quizRoutes.post('/question', createQuizQuestion);
quizRoutes.post('/follow/:quizId', followQuiz);
quizRoutes.delete('/follow/:quizId', unFollowQuiz);

export { quizRoutes };
