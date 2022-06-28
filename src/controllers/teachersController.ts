import { Request, Response } from 'express';
import * as services from '../services/teachersServices.js';

export async function getTeachers(_req: Request, res: Response) {
  const teachers = await services.getTeachers();

  return res.send(teachers);
}
