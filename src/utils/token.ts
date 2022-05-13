import * as jwt from 'jsonwebtoken';
import { config } from '../config';

export const createToken = (id: number) => jwt.sign({ id }, config.sekretKey, { expiresIn: '1 days' });

export const verifyToken = (token: string) => jwt.verify(token, config.sekretKey);
