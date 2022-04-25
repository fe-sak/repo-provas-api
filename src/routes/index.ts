import { Router } from 'express';
import authRouter from './authRoutes.js';
import testsRouter from './testsRoutes.js';

const router = Router();

router.use(authRouter);
router.use(testsRouter);

export default router;
