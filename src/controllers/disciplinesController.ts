import { Request, Response } from 'express';
import * as services from '../services/disciplinesServices.js';

export async function getDisciplines(_req: Request, res: Response) {
  const disciplines = await services.getDisciplines();

  return res.send(disciplines);
}
