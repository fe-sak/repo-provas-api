import { Router } from 'express';
import validateTokenMiddleware from '../middlewares/validateTokenMiddleware.js';
import * as controller from '../controllers/categoriesController.js';

const categoriesRouter = Router();

categoriesRouter.get(
  '/categories',
  validateTokenMiddleware,
  controller.getCategories
);

export default categoriesRouter;
