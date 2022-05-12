/* eslint-disable no-shadow */
import bcrypt from 'bcrypt';
import { config } from '../config';

const hash = (password: string) => {
  return bcrypt.hash(password, config.saltRounds);
};

const compare = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export default {
  hash,
  compare,
};
