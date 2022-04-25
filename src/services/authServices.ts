import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as usersRepo from '../repositories/usersRepo.js';
import * as errors from '../errors/index.js';

export async function signUp(signup: usersRepo.ISignup) {
  const { name, email, password } = signup;

  const user = await usersRepo.findByEmail(email);
  if (user) throw errors.Conflict();

  const passwordHash = await bcrypt.hash(password, 10);

  const persistedSignup = { name, email, password: passwordHash };

  await usersRepo.create(persistedSignup);

  return '';
}

export type ILogin = Omit<usersRepo.ISignup, 'name'>;

export async function logIn(login: ILogin) {
  const { email, password } = login;

  const user = await usersRepo.findByEmail(email);
  if (!user) throw errors.Unauthorized();

  const authorized = await bcrypt.compare(password, user.password);
  if (!authorized) throw errors.Unauthorized();

  const secretKey = process.env.JWT_SECRET;

  const { password: toBeDeleted, ...persistedUser } = user;
  const token = jwt.sign(persistedUser, secretKey);

  return token;
}

export async function getByToken(token: string) {
  const secretKey = process.env.JWT_SECRET;
  let user = {};

  jwt.verify(token, secretKey, (error, verifiedUser) => {
    if (error) throw errors.Unauthorized();
    else user = verifiedUser;
  });

  return user;
}
