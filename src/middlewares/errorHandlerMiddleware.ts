import { ErrorRequestHandler } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error.statusCode) {
    console.log(error);
    return res.sendStatus(error.statusCode);
  }
  console.log(error);
  return res.sendStatus(500);
};

export default errorHandler;
