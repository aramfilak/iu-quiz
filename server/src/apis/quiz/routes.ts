import { Router } from 'express';
import * as quizService from './services';

const quizRoutes = Router();

quizRoutes.patch('/score/:quizId', quizService.updateQuizScores);
quizRoutes.post('/toggle-follow/:quizId', quizService.toggleFollowQuiz);
quizRoutes.post('/toggle-like/:quizId', quizService.toggleLikeQuiz);

quizRoutes.get('/', quizService.findAllQuizzes);
quizRoutes.get('/:quizId', quizService.findQuizById);
quizRoutes.post('/', quizService.createQuiz);
quizRoutes.patch('/:quizId', quizService.updateQuiz);
quizRoutes.delete('/:quizId', quizService.deleteQuizById);

export { quizRoutes };
