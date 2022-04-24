import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization: token } = req.headers;

  const secretKey = process.env.JWT_SECRET;

  const user = jwt.verify(token, secretKey);

  res.locals.user = user;
  next();
}
