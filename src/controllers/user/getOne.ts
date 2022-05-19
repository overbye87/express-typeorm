/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import { Handler } from 'express';
import dataSource from '../../db/dataSource';
import { User } from '../../db/entities/User';
import { myError } from '../../utils/myError';

const userRepository = dataSource.getRepository(User);

export const getOne: Handler = async (req, res, next) => {
  try {
    console.log('\n');
    console.log('getOneUser', req.params);

    const user = await userRepository.findOneBy(
      { id: Number(req.params.id) },
    );

    if (!user) {
      throw myError({
        status: 401,
        message: `No user with id: ${req.params.id}`,
      });
    }
    delete user.password;
    return res.json({
      data: user,
      message: `User with id: ${req.params.id} retrieved successfully`,
    });
  } catch (error) {
    next(error);
  }
};
