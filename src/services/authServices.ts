import bcrypt from 'bcrypt';
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
