import { database } from '../../src/database.js';
import { userFactory } from './userFactory.js';
import bcrypt from 'bcrypt';
import supertest from 'supertest';
import app from '../../src/app.js';

export async function tokenFactory() {
  const user = userFactory();
  const persistedUser = {
    ...user,
    password: bcrypt.hashSync(user.password, 10),
  };

  await database.user.create({
    data: persistedUser,
  });

  const body = {
    email: user.email,
    password: user.password,
  };

  const response = await supertest(app).post('/login').send(body);
  const token = response.text;
  return token;
}
