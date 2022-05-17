/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { Handler } from 'express';
import { DeepPartial } from 'typeorm';
import dataSource from '../../db/dataSource';
import { Role } from '../../db/entities/Role';
import { User } from '../../db/entities/User';
import { createHash } from '../../utils/hash';
import { throwError } from '../../utils/throwError';
import { createToken } from '../../utils/token';

const userRepository = dataSource.getRepository(User);
const roleRepository = dataSource.getRepository(Role);

export const signUp: Handler = async (req, res, next) => {
  try {
    console.log('\n');
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
    const password = await createHash(req.body.password);
    const role = await roleRepository.findOne({
      where: {
        roleName: 'USER',
      },
    });
    const newUser: DeepPartial<User> = {
      email: req.body.email,
      password,
      login: req.body.login,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      role,
    };
    const user = userRepository.create(newUser);
    await userRepository.save(user);
    delete user.password;
    return res.json({
      data: user,
      message: 'User created successfully',
      token: createToken(user.id),
    });
  } catch (error) {
    next(error);
  }
};
