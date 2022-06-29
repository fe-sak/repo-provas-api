import * as testsRepo from '../repositories/testsRepo.js';

export async function getTerms() {
  const terms = await testsRepo.getByDisciplines();

  return { terms };
}




