import { database } from '../database.js';

export interface ISignup {
  name: string;
  email: string;
  password: string;
}

export async function findByEmail(email: string) {
  const user = await database.users.findUnique({ where: { email } });

  return user;
}

export async function create(signup: ISignup) {
  await database.users.create({ data: signup });
}
