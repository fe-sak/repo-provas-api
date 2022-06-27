import { database } from '../database.js';

export async function read() {
  const disciplines = await database.discipline.findMany({
    where: {
      disciplinesTeachers: {
        some: {},
      },
    },
  });

  return disciplines;
}
