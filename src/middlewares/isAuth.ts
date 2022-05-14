import { Handler } from 'express';
import { verifyToken } from '../utils/token';

export const isAuth: Handler = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];
    const { id } = verifyToken(String(token));
    console.log(id, token);
    next();
  } catch (error) {
    next(error);
  }
};
