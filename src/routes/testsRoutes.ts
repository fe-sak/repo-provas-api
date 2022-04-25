import { Router } from 'express';
import validateTokenMiddleware from '../middlewares/validateTokenMiddleware.js';
import * as controller from '../controllers/testsController.js';

const testsRouter = Router();

testsRouter.get('/tests', validateTokenMiddleware, controller.getTests);

export default testsRouter;
