import { database } from '../database.js';

export async function read() {
  const categories = await database.category.findMany({});

  return categories;
}

export async function readById(id: number) {
  const category = await database.category.findUnique({
    where: {
      id,
    },
  });

  return category;
}
