import { database } from '../src/database.js';
import bcrypt from 'bcrypt';
import supertest from 'supertest';
import app from '../src/app.js';
import { userFactory } from './factories/userFactory.js';
import { tokenFactory } from './factories/tokenFactory.js';
import { testFactory } from './factories/testFactory.js';
import dayjs from 'dayjs';
import { faker } from '@faker-js/faker';

describe('POST /login', () => {
  beforeEach(truncateUsers);

  afterAll(disconnect);

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
  beforeEach(truncateUsers);

  afterAll(disconnect);

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

describe('GET /categories', () => {
  beforeEach(truncateUsers);

  afterAll(disconnect);

  it('should return status code 200 if given valid token', async () => {
    const token = await tokenFactory();

    const response = await supertest(app)
      .get('/categories')
      .set('authorization', token);

    expect(response.statusCode).toBe(200);
  });

  it('should return status code 401 if given invalid token', async () => {
    const response = await supertest(app)
      .get('/categories')
      .set('authorization', 'invalid token');

    expect(response.statusCode).toBe(401);
  });
});

describe('GET /disciplines', () => {
  beforeEach(truncateUsers);

  afterAll(disconnect);

  it('should return status code 200 if given valid token', async () => {
    const token = await tokenFactory();

    const response = await supertest(app)
      .get('/disciplines')
      .set('authorization', token);

    expect(response.statusCode).toBe(200);
  });

  it('should return status code 401 if given invalid token', async () => {
    const response = await supertest(app)
      .get('/disciplines')
      .set('authorization', 'invalid token');

    expect(response.statusCode).toBe(401);
  });
});

describe('GET /teachers', () => {
  beforeEach(truncateUsers);

  afterAll(disconnect);

  it('should return status code 200 if given valid token', async () => {
    const token = await tokenFactory();

    const response = await supertest(app)
      .get('/teachers')
      .set('authorization', token);

    expect(response.statusCode).toBe(200);
  });

  it('should return status code 401 if given invalid token', async () => {
    const response = await supertest(app)
      .get('/teachers')
      .set('authorization', 'invalid token');

    expect(response.statusCode).toBe(401);
  });
});

describe('GET /tests', () => {
  beforeEach(truncateUsers);

  afterAll(disconnect);

  it('should return status code 200 if given valid token', async () => {
    const token = await tokenFactory();

    const response = await supertest(app)
      .get('/tests')
      .set('authorization', token);

    expect(response.statusCode).toBe(200);
  });

  it('should return status code 401 if given invalid token', async () => {
    const response = await supertest(app)
      .get('/tests')
      .set('authorization', 'invalid token');

    expect(response.statusCode).toBe(401);
  });
});

describe('GET /tests?byTeachers=true', () => {
  beforeEach(truncateUsers);

  afterAll(disconnect);

  it('should return status code 200 if given valid token', async () => {
    const token = await tokenFactory();

    const response = await supertest(app)
      .get('/tests?byTeachers=true')
      .set('authorization', token);

    expect(response.statusCode).toBe(200);
  });

  it('should return status code 401 if given invalid token', async () => {
    const response = await supertest(app)
      .get('/tests?byTeachers=true')
      .set('authorization', 'invalid token');

    expect(response.statusCode).toBe(401);
  });
});

describe('POST /tests', () => {
  beforeEach(truncateUsers);
  beforeEach(truncateTests);

  afterAll(disconnect);

  it('should answer with status code 201 when given valid body', async () => {
    const token = await tokenFactory();

    const test = testFactory();

    const response = await supertest(app)
      .post('/tests')
      .set('authorization', token)
      .send(test);

    expect(response.statusCode).toBe(201);
  });

  it('should answer with status code 401 when given invalid token', async () => {
    const test = testFactory();

    const response = await supertest(app)
      .post('/tests')
      .set('authorization', 'invalid token')
      .send(test);

    expect(response.statusCode).toBe(401);
  });

  it('should answer with status code 422 when given invalid body', async () => {
    const token = await tokenFactory();

    const { name, ...invalidTest } = testFactory();

    const response = await supertest(app)
      .post('/tests')
      .set('authorization', token)
      .send(invalidTest);

    expect(response.statusCode).toBe(422);
  });

  it('should answer with status code 404 when given non existing ids', async () => {
    const token = await tokenFactory();

    const test = testFactory();
    test.categoryId = 1000;

    const response = await supertest(app)
      .post('/tests')
      .set('authorization', token)
      .send(test);

    expect(response.statusCode).toBe(404);
  });
});

describe('POST /tests/:testId', () => {
  beforeEach(truncateUsers);
  beforeEach(truncateTests);

  afterAll(disconnect);

  it('should answer with status code 201 when given valid testId', async () => {
    const token = await tokenFactory();

    await createTest();

    const { id } = await database.test.findFirst();

    const response = await supertest(app)
      .post(`/tests/${id}`)
      .set('authorization', token);
    expect(response.statusCode).toBe(201);
  });

  it('should answer with status code 404 when given invalid testId', async () => {
    const token = await tokenFactory();

    await createTest();

    const { id } = await database.test.findFirst();

    let invalidId = createRandomInt();

    while (id === invalidId) {
      invalidId = createRandomInt();
    }

    const response = await supertest(app)
      .post(`/tests/${invalidId}`)
      .set('authorization', token);
    expect(response.statusCode).toBe(404);
  });
});

async function createTest() {
  const test = {
    name: dayjs(faker.date.recent()).format('MM/YYYY'),
    pdfUrl: faker.image.animals(),
    categoryId: 1,
    disciplineTeacherId: 1,
  };

  await database.test.create({ data: test });
}

function createRandomInt() {
  return Math.floor(Math.random() * 10);
}

async function truncateUsers() {
  await database.$executeRaw`TRUNCATE TABLE users;`;
}

async function truncateTests() {
  await database.$executeRaw`TRUNCATE TABLE tests;`;
}

async function disconnect() {
  await database.$disconnect();
}
