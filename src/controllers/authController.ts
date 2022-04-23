import { Request, Response } from 'express';
import * as services from '../services/authServices.js';

export async function signUp(req: Request, res: Response) {
  const signup: services.ISignup = req.body;

  await services.signUp(signup);

  return res.sendStatus(201);
}
