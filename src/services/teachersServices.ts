import * as repo from '../repositories/teachersRepo.js';

export async function getTeachers() {
  const teachers = await repo.read();

  return teachers;
}
