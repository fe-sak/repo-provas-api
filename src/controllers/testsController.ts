import { Request, Response } from 'express';
import * as services from '../services/testsServices.js';

export async function getTests(req: Request, res: Response) {
  const query = req.query;
  if (query?.byTeachers === 'true') {
    const tests = await services.getTestsByTeachers();

    return res.send(tests);
  }
  const terms = await services.getTestsByDisciplines();

  return res.send(terms);
}
