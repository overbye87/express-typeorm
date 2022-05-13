import { MyError } from '../types/types';

export const throwError = (options: { status: number, message: string }) => {
  const error = new Error(options.message) as MyError;
  error.status = options.status;
  throw error;
};
