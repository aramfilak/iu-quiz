import { Router } from 'express';
import * as quizService from './services';

const quizRoutes = Router();

quizRoutes.post('/follow/:quizId', quizService.followQuiz);
quizRoutes.delete('/follow/:quizId', quizService.unFollowQuiz);

quizRoutes.get('/', quizService.findAllQuizzes);
quizRoutes.get('/:quizId', quizService.findQuizById);
quizRoutes.post('/', quizService.createQuiz);
quizRoutes.patch('/:quizId', quizService.updateQuiz);
quizRoutes.delete('/:quizId', quizService.deleteQuizById);

export { quizRoutes };
