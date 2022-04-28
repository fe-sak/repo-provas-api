import { Router } from 'express';
import validateTokenMiddleware from '../middlewares/validateTokenMiddleware.js';
import * as controller from '../controllers/testsController.js';

const testsRouter = Router();

testsRouter.get('/tests', validateTokenMiddleware, controller.getTests);

testsRouter.post('/tests/:testId', validateTokenMiddleware, controller.addView);

export default testsRouter;
