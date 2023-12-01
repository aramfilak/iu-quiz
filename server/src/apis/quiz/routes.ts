import { Router } from 'express';
import * as quizService from './services';

const quizRoutes = Router();

quizRoutes.get('/follow', quizService.findFollowedQuizzes);
quizRoutes.post('/follow/:quizId', quizService.followQuiz);
quizRoutes.delete('/follow/:quizId', quizService.unFollowQuiz);

quizRoutes.get('/', quizService.findAllQuizzes);
quizRoutes.get('/:quizId', quizService.findQuizById);
quizRoutes.post('/', quizService.createQuiz);
quizRoutes.delete('/:quizId', quizService.deleteQuizById);

quizRoutes.post('/question', quizService.createQuizQuestion);

export { quizRoutes };
