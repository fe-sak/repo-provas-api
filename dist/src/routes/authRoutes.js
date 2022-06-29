import { Router } from 'express';
import * as controller from '../controllers/authController.js';
import { validateSchemaMiddleware } from '../middlewares/validateSchemaMiddleware.js';
import { loginSchema, signupSchema } from '../schemas/index.js';
var authRouter = Router();
authRouter.post('/signup', validateSchemaMiddleware(signupSchema), controller.signUp);
authRouter.post('/login', validateSchemaMiddleware(loginSchema), controller.logIn);
export default authRouter;
