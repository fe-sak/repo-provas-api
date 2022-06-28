import { Request, Response } from 'express';
import * as services from '../services/categoriesServices.js';

export async function getCategories(_req: Request, res: Response) {
  const categories = await services.getCategories();

  return res.send(categories);
}
