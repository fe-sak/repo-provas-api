import { Request, Response } from 'express';
import * as authServices from '../services/authServices.js';
import * as usersRepo from '../repositories/usersRepo.js';

export async function signUp(req: Request, res: Response) {
  const signup: usersRepo.ISignup = req.body;

  await authServices.signUp(signup);

  return res.sendStatus(201);
}

export async function logIn(req: Request, res: Response) {
  const login: authServices.ILogin = req.body;

  const token = await authServices.logIn(login);

  return res.send(token);
}
