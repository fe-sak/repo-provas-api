import { database } from '../database.js';
import { User } from '@prisma/client';

export type ISignup = Omit<User, 'id'>;

export async function findByEmail(email: string) {
  const user = await database.user.findUnique({ where: { email } });

  return user;
}

export async function create(signup: ISignup) {
  await database.user.create({ data: signup });
}
