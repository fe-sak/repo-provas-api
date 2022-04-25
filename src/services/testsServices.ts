import * as testsRepo from '../repositories/testsRepo.js';

export async function getTestsByDisciplines() {
  const terms = await testsRepo.getByDisciplines();

  return { terms };
}

export async function getTestsByTeachers() {
  const tests = await testsRepo.getByTeachers();

  return { tests };
}
