import { database } from '../database.js';

export async function getByDisciplines() {
  return database.term.findMany({
    select: {
      number: true,
      disciplines: {
        select: {
          name: true,
          disciplinesTeachers: {
            select: {
              teacher: {
                select: { name: true },
              },
              tests: {
                select: {
                  name: true,
                  pdfUrl: true,
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
      name: true,
      pdfUrl: true,
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
              name: true,
            },
          },
        },
      },
    },
  });
}
