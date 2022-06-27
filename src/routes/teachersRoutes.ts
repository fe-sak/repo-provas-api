import { Router } from 'express';
import validateTokenMiddleware from '../middlewares/validateTokenMiddleware.js';
import * as controller from '../controllers/teachersController.js';

const teachersRouter = Router();

teachersRouter.get(
  '/teachers',
  validateTokenMiddleware,
  controller.getTeachers
);

export default teachersRouter;
