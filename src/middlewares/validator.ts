/* eslint-disable no-console */
import { Handler } from 'express';
import * as yup from 'yup';

const validator = (yupObjectSchema: yup.ObjectSchema<{}>): Handler => {
  return async (req, res, next) => {
    try {
      await yupObjectSchema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      }, { abortEarly: false });
      next();
    } catch (error) {
      console.log('YUP Errors:', error.errors);
      error.message = error.errors.join(' ');
      next(error);
    }
  };
};

export default validator;
