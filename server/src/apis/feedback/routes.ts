import { Router } from 'express';
import * as feedbackServices from './services';

const feedbackRouter = Router();

feedbackRouter.post('/', feedbackServices.createFeedback);
feedbackRouter.patch('/', feedbackServices.updateFeedback);
feedbackRouter.delete('/', feedbackServices.deleteFeedback);

export { feedbackRouter };
