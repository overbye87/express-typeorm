/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express';

const errorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error('ERROR:', error.message);
  return res.status(error.status ? error.status : 400).json({
    message: error.message,
  });
};

export default errorHandler;
