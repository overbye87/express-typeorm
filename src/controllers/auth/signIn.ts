/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import { Handler, Request, Response } from 'express';
import dataSource from '../../db/dataSource';
import { User } from '../../db/entities/User';
import { IUser } from '../../types/user';
import { verifyHash } from '../../utils/hash';
import { myError } from '../../utils/myError';
import { createToken } from '../../utils/token';

const userRepository = dataSource.getRepository(User);

interface SignInResponseBody {
  data?: IUser;
  message: string;
  token?: string;
}

export const signIn: Handler = async (req, res: Response<SignInResponseBody>, next) => {
  try {
    console.log('\n');
    console.log('signIn');
    console.log('body', req.body);
    console.log('query', req.query);
    console.log('params', req.params);
    if (!req.body.email || !req.body.password) {
      throw myError({
        status: 400,
        message: 'Invalid req body',
      });
    }
    const user = await userRepository.findOneBy({
      email: req.body.email,
    });
    if (!user) {
      throw myError({
        status: 401,
        message: `No user with email: ${req.body.email}`,
      });
    }
    if (!await verifyHash(req.body.password, user.password)) {
      throw myError({
        status: 401,
        message: 'Password is incorrect',
      });
    }
    delete user.password;
    console.log('SUCCESS: ', user);
    return res.json({
      data: user,
      message: 'User retrieved successfully',
      token: createToken(user.id),
    });
  } catch (error) {
    next(error);
  }
};
