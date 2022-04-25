import { NextFunction, Request, Response } from 'express';
import * as services from '../services/authServices.js';

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization: token } = req.headers;
  if (!token) return res.sendStatus(401);

  const user = await services.getByToken(token);
  res.locals.user = user;
  next();
}
