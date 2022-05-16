/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import { Handler, Request, Response } from 'express';
import { AppDataSource } from '../../db/dataSource';
import { User } from '../../db/entity/User';
import { IUser } from '../../types/user';
import { verifyHash } from '../../utils/hash';
import { throwError } from '../../utils/throwError';
import { createToken } from '../../utils/token';

const userRepository = AppDataSource.getRepository(User);

interface SignInResponseBody {
  data?: IUser;
  message: string;
  token?: string;
}

export const signIn: Handler = async (req, res: Response<SignInResponseBody>, next) => {
  try {
    console.log('\n');
    console.log('signIn', req.body);
    if (!req.body.email || !req.body.password) {
      throwError({
        status: 400,
        message: 'Invalid req body',
      });
    }
    const user = await userRepository.findOneBy({
      email: req.body.email,
    });
    if (!user) {
      throwError({
        status: 401,
        message: `No user with email: ${req.body.email}`,
      });
    }
    if (!await verifyHash(req.body.password, user.password)) {
      throwError({
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
