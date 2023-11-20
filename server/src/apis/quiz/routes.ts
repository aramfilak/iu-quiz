import { Router } from 'express';
import { findAllQuizzes, findQuizById, createQuiz, updateQuiz, deleteQuiz } from './services';
import { authenticate } from '../../middlewares/authenticate';

const quizRoutes = Router();

quizRoutes.post('/', authenticate, createQuiz);

export { quizRoutes };
