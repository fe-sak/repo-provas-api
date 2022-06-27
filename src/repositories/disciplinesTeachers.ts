import { database } from '../database.js';

export async function readById(id: number) {
  const disciplineTeacher = await database.disciplineTeacher.findUnique({
    where: {
      id,
    },
  });

  return disciplineTeacher;
}
