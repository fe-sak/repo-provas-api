import { database } from '../database.js';

export async function getById(testId: number) {
  return database.test.findUnique({ where: { id: testId } });
}

export async function getByDisciplines() {
  return database.term.findMany({
    select: {
      number: true,
      disciplines: {
        select: {
          id: true,
          name: true,
          disciplinesTeachers: {
            select: {
              teacher: {
                select: { name: true },
              },
              tests: {
                select: {
                  id: true,
                  name: true,
                  pdfUrl: true,
                  views: true,
                  category: { select: { name: true } },
                },
              },
            },
          },
        },
      },
    },
  });
}

export async function getByTeachers() {
  return database.test.findMany({
    select: {
      id: true,
      name: true,
      pdfUrl: true,
      views: true,
      category: {
        select: {
          name: true,
        },
      },
      disciplineTeacher: {
        select: {
          teacher: {
            select: {
              name: true,
            },
          },
          discipline: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });
}

export async function incrementView(testId: number) {
  await database.test.update({
    where: {
      id: testId,
    },
    data: {
      views: {
        increment: 1,
      },
    },
  });
}
