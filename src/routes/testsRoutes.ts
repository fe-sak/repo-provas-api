import { Router } from 'express';
import validateTokenMiddleware from '../middlewares/validateTokenMiddleware.js';
import * as controller from '../controllers/testsController.js';
import { validateSchemaMiddleware } from '../middlewares/validateSchemaMiddleware.js';
import { createTestSchema } from '../schemas/index.js';

const testsRouter = Router();

testsRouter.get('/tests', validateTokenMiddleware, controller.getTests);

testsRouter.post(
  '/tests',
  validateTokenMiddleware,
  validateSchemaMiddleware(createTestSchema),
  controller.createTest
);

testsRouter.post('/tests/:testId', validateTokenMiddleware, controller.addView);

export default testsRouter;
