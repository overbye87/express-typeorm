import { Handler } from 'express';
import * as yup from 'yup';

const validator = (yupObjectSchema: yup.ObjectSchema<{}>): Handler => {
  return async (req, res, next) => {
    try {
      await yupObjectSchema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default validator;
