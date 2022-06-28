import { Router } from 'express';
import { getHealth } from '../controllers/healthController.js';

const healthRouter = Router();

healthRouter.get('/health', getHealth);

export default healthRouter;
