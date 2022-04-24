import { Router } from 'express';
import * as controller from '../controllers/authController.js';
import { validateSchemaMiddleware } from '../middlewares/validateSchemaMiddleware.js';
import validateTokenMiddleware from '../middlewares/validateTokenMiddleware.js';
import { loginSchema, signupSchema } from '../schemas/index.js';

const authRouter = Router();

authRouter.post(
  '/signup',
  validateSchemaMiddleware(signupSchema),
  validateTokenMiddleware, //TODO REMOVE LINE, ITS FOR TESTING ONLY
  controller.signUp
);

authRouter.post(
  '/login',
  validateSchemaMiddleware(loginSchema),
  controller.logIn
);

export default authRouter;
