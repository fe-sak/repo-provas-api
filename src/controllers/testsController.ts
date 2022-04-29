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

export async function addView(req: Request, res: Response) {
  const { testId } = req.params;

  if (!testId) return res.sendStatus(404);

  await services.addView(testId);

  return res.sendStatus(201);
}

export async function createTest(req: Request, res: Response) {
  const test = req.body;

  await services.createTest(test);
  return res.sendStatus(201);
}
