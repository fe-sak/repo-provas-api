import { Request, Response } from 'express';

export function getHealth(req: Request, res: Response) {
  return res.sendStatus(200);
}
