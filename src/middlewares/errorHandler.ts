/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { Handler } from 'express';
import { MyError } from '../types/types';

const errorHandler = (error, req, res, next) => {
  console.error('ERROR:', error.message);
  return res.status(error.status ? error.status : 400).json({
    message: error.message,
  });
};

export default errorHandler;
