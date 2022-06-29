import { Request, Response } from 'express';
import * as services from '../services/termsServices.js';

export async function getTerms(_req: Request, res: Response) {
  const terms = services.getTerms();

  return res.send(terms);
}
