import { database } from '../database.js';

export async function getTerms() {
  const terms = await database.term.findMany({});

  return terms;
}
