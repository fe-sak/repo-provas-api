import { Router } from 'express';
import * as controller from '../controllers/authController.js';
import { validateSchemaMiddleware } from '../middlewares/validateSchemaMiddleware.js';
import { signupSchema } from '../schemas/index.js';

const authRouter = Router();

authRouter.post(
  '/signup',
  validateSchemaMiddleware(signupSchema),
  controller.signUp
);

export default authRouter;
