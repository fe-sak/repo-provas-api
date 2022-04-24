import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userRepo from '../repositories/userRepo.js';
import * as errors from '../errors/index.js';

export interface ISignup {
  name: string;
  email: string;
  password: string;
}

export async function signUp(signup: ISignup) {
  const { name, email, password } = signup;

  const user = await userRepo.findByEmail(email);
  if (user) throw errors.Conflict();

  const passwordHash = await bcrypt.hash(password, 10);

  const persistedSignup = { name, email, password: passwordHash };

  await userRepo.create(persistedSignup);

  return '';
}

export type ILogin = Omit<ISignup, 'name'>;

export async function logIn(login: ILogin) {
  const { email, password } = login;

  const user = await userRepo.findByEmail(email);
  if (!user) throw errors.Unauthorized();

  const authorized = await bcrypt.compare(password, user.password);
  if (!authorized) throw errors.Unauthorized();

  const secretKey = process.env.JWT_SECRET;

  const { password: toBeDeleted, ...persistedUser } = user;
  const token = jwt.sign(persistedUser, secretKey);

  return token;
}
