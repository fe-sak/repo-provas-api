import { Router } from 'express';
import validateTokenMiddleware from '../middlewares/validateTokenMiddleware.js';
import * as controller from '../controllers/disciplinesController.js';
var disciplinesRouter = Router();
disciplinesRouter.get('/disciplines', validateTokenMiddleware, controller.getDisciplines);
export default disciplinesRouter;
