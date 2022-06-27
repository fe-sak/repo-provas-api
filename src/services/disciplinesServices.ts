import * as repo from '../repositories/disciplinesRepo.js';

export async function getDisciplines() {
  const disciplines = await repo.read();

  return disciplines;
}
