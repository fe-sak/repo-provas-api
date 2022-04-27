import { database } from '../src/database.js';
import bcrypt from 'bcrypt';
import supertest from 'supertest';
import app from '../src/app.js';
import { userFactory } from './factories/index.js';

describe('POST /login', () => {
  beforeEach(async () => {
    await database.$executeRaw`TRUNCATE TABLE users;`;
  });

  afterAll(async () => {
    await database.$disconnect();
  });

  it('should answer with status code 200 when given valid credentials', async () => {
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

    expect(response.status).toBe(200);
  });

  it('should answer with status code 401 when given unregistered email', async () => {
    const user = userFactory();
    const persistedUser = {
      ...user,
      password: bcrypt.hashSync(user.password, 10),
    };

    await database.user.create({
      data: persistedUser,
    });

    const body = {
      email: user.email + 'wrong email',
      password: user.password,
    };

    const response = await supertest(app).post('/login').send(body);

    expect(response.status).toBe(401);
  });

  it('should answer with status code 401 when given wrong password', async () => {
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
      password: user.password + 'wrong password',
    };

    const response = await supertest(app).post('/login').send(body);

    expect(response.status).toBe(401);
  });
});

describe('POST /signup', () => {
  beforeEach(async () => {
    await database.$executeRaw`TRUNCATE TABLE users;`;
  });

  afterAll(async () => {
    await database.$disconnect();
  });

  it('should answer with status code 201 when given valid signup', async () => {
    const body = userFactory();

    await supertest(app).post('/signup').send(body);

    const persistedUser = await database.user.findUnique({
      where: { email: body.email },
    });

    let wasUserPersisted = false;

    if (persistedUser.email === body.email) wasUserPersisted = true;

    expect(wasUserPersisted).toBe(true);
  });

  it('should answer with status code 409 when given an already registered email', async () => {
    const body = userFactory();

    await supertest(app).post('/signup').send(body);

    const response = await supertest(app).post('/signup').send(body);

    expect(response.statusCode).toBe(409);
  });

  it('should answer with status code 422 when given an empty signup', async () => {
    const body = {};

    const response = await supertest(app).post('/signup').send(body);

    expect(response.statusCode).toBe(422);
  });

  it('should answer with status code 422 when given an invalid email', async () => {
    const user = userFactory();

    const body = { ...user, email: user.email + 'invalid email' };

    const response = await supertest(app).post('/signup').send(body);

    expect(response.statusCode).toBe(422);
  });
});
