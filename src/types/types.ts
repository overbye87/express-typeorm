import { NextFunction, Request, Response } from 'express';

export interface MyError extends Error {
  status: number,
  message: string,
}

export interface Controller {
  error: MyError;
  request: Request;
  response: Response;
  next: NextFunction;
}
