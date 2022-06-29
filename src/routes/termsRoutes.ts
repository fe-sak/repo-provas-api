import { Router } from 'express';
import validateTokenMiddleware from '../middlewares/validateTokenMiddleware.js';
import * as controller from '../controllers/testsController.js';

const termsRouter = Router();

termsRouter.get('/terms', validateTokenMiddleware, controller.getTests);

export default termsRouter;
