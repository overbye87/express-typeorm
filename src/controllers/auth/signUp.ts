/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { Handler } from 'express';
import { AppDataSource } from '../../data-source';
import { User } from '../../entity/User';
import { createHash } from '../../utils/hash';
import { throwError } from '../../utils/throwError';
import { createToken } from '../../utils/token';

const userRepository = AppDataSource.getRepository(User);

export const signUp: Handler = async (req, res, next) => {
  try {
    console.log('signUp', req.body);
    if (!req.body.email || !req.body.password) {
      throwError({
        status: 400,
        message: 'Invalid req body',
      });
    }
    const candidate = await userRepository.findOneBy({
      email: req.body.email,
    });
    if (candidate) {
      throwError({
        status: 401,
        message: `Email ${req.body.email} alredy exist`,
      });
    }
    const newUser: Omit<User, 'id'> = {
      email: req.body.email,
      password: await createHash(req.body.password),
      login: req.body.login,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };
    const user = userRepository.create(newUser);
    await userRepository.save(user);
    return res.json({
      data: user,
      message: 'User created successfully',
      token: createToken(user.id),
    });
  } catch (error) {
    next(error);
  }
};
