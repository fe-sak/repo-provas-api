import { Request, Response } from 'express';
import * as services from '../services/testsServices.js';

export async function getTests(_req: Request, res: Response) {
  const tests = await services.getTestsByTerms();

  return res.send(tests);
}
