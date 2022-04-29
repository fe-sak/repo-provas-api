import { Router } from 'express';
import authRouter from './authRoutes.js';
import categoriesRouter from './categoriesRoutes.js';
import disciplinesRouter from './disciplinesRoutes.js';
import testsRouter from './testsRoutes.js';
import teachersRouter from './teachersRoutes.js';

const router = Router();

router.use(authRouter);
router.use(testsRouter);
router.use(categoriesRouter);
router.use(disciplinesRouter);
router.use(teachersRouter);

export default router;
