import { Router } from 'express';
import * as questionServices from './services';

const quizQuestionRouter = Router();

quizQuestionRouter.post('/', questionServices.createQuizQuestion);
quizQuestionRouter.delete('/', questionServices.deleteQuestionById);
quizQuestionRouter.patch('/:questionId', questionServices.updateQuizQuestion);

export { quizQuestionRouter };
