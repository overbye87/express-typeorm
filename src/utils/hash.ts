/* eslint-disable no-shadow */
import * as bcrypt from 'bcrypt';
import { config } from '../config';

export const createHash = (password: string) => {
  return bcrypt.hash(password, config.saltRounds);
};

export const verifyHash = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};
