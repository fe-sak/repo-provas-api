import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import { database } from '../../src/database.js';

export function testFactory() {
  const test = {
    name: dayjs(faker.date.recent()).format('MM/YYYY'),
    pdfUrl: faker.image.animals(),
    categoryId: 1,
    disciplineTeacherId: 1,
  };

  return test;
}

export async function persistedTestFactory() {
  const test = {
    name: dayjs(faker.date.recent()).format('MM/YYYY'),
    pdfUrl: faker.image.animals(),
    categoryId: 1,
    disciplineTeacherId: 1,
  };

  await database.test.create({ data: test });
  return test;
}
