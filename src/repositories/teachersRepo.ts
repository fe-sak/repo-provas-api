import { database } from '../database.js';

export async function read() {
  const teachers = await database.teacher.findMany({
    select: {
      name: true,
      disciplinesTeachers: {
        select: {
          id: true,
          discipline: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return teachers;
}
