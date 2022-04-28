import * as testsRepo from '../repositories/testsRepo.js';
import * as errors from '../errors/index.js';

export async function getTestsByDisciplines() {
  const terms = await testsRepo.getByDisciplines();

  return { terms };
}

export async function getTestsByTeachers() {
  const tests = await testsRepo.getByTeachers();

  return { tests };
}

export async function addView(testId: string) {
  const testIdNumber = Number(testId);

  if (isNaN(testIdNumber)) throw errors.NotFound();

  const testExists = await testsRepo.getById(testIdNumber);

  if (!testExists) throw errors.NotFound();

  await testsRepo.incrementView(testIdNumber);
}
