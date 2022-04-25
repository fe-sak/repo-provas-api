import * as testsRepo from '../repositories/testsRepo.js';

export async function getTestsByTerms() {
  const terms = await testsRepo.get();

  return { terms };
}
