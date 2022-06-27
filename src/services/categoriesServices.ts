import * as repo from '../repositories/categoriesRepo.js';

export async function getCategories() {
  const categories = await repo.read();

  return categories;
}
