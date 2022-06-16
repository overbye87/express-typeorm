/* eslint-disable no-unused-vars */
import { Handler, Response } from 'express';
import { IUser } from '../../types/user';
import { createToken } from '../../utils/token';

interface checkResponseBody {
  data?: IUser;
  message: string;
  token?: string;
}

export const check: Handler = async (req, res: Response<checkResponseBody>, next) => {
  console.log('\n');
  console.log('check');
  const { user } = req.body;
  delete user.password;
  console.log('SUCCESS: ', user);
  return res.json({
    data: user,
    message: 'Token check and refresh successfully',
    token: createToken(user.id),
  });
};
