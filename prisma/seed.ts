/* eslint-disable @typescript-eslint/no-explicit-any */
import faker from '@faker-js/faker';
import { database } from '../src/database.js';
import dayjs from 'dayjs';

async function main() {
  const teachers = ['Dina', 'Bruna', 'Leo', 'Thiago', 'Iagod'];
  const categories = ['P1', 'P2', 'P3', 'P4'];
  const terms = [1, 2, 3, 4];
  const disciplines = [
    'CSS',
    'TypeScript',
    'C',
    'PostgreSQL',
    'React',
    'Python',
  ];

  await createTeachers(teachers);
  await createCategories(categories);
  await createTerms(terms);
  await createDisciplines(disciplines);
  await createDisciplinesTeachers();
  await createTests(20);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await database.$disconnect();
  });

async function createCategories(categories: string[]) {
  const data = categories.map((categories) => ({ name: categories }));

  await createMany(data, 'category');
}

async function createTeachers(teachers: string[]) {
  const data = teachers.map((teacher) => ({ name: teacher }));

  await createMany(data, 'teacher');
}

async function createTerms(terms: number[]) {
  const data = terms.map((term) => ({ number: term }));

  await createMany(data, 'term');
}

async function createDisciplines(disciplines: string[]) {
  const terms = await database.term.findMany();

  const termIds = terms.map((term) => term.id);
  const data = disciplines.map((discipline) => ({
    name: discipline,
    termId: getRandomElement(termIds),
  }));

  await createMany(data, 'discipline');
}

async function createDisciplinesTeachers() {
  const disciplines = await database.discipline.findMany();
  const teachers = await database.teacher.findMany();

  const data = Array.from({ length: 12 }).map(() => ({
    disciplineId: getRandomElement(disciplines).id,
    teacherId: getRandomElement(teachers).id,
  }));

  await createMany(data, 'disciplineTeacher');
}

async function createTests(quantity: number) {
  const categories = await database.category.findMany();
  const disciplinesTeachers = await database.disciplineTeacher.findMany();

  const data = Array.from({ length: quantity }).map(() => ({
    name: dayjs(faker.date.past()).format('DD/MM/YYYY'),
    pdfUrl: faker.image.animals(),
    categoryId: getRandomElement(categories).id,
    disciplineTeacherId: getRandomElement(disciplinesTeachers).id,
  }));

  await createMany(data, 'test');
}

async function createMany(data: any[], table: string) {
  const createResult = await database[table].createMany({
    data,
    skipDuplicates: true,
  });
  console.log(table);
  console.log(data);

  console.log({ createResult });
}

function getRandomElement(array: any[]) {
  return array[Math.floor(Math.random() * array.length)];
}
