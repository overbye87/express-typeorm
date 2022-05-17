/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import dataSource from '../../db/dataSource';
import { User } from '../../db/entities/User';

const userRepository = dataSource.getRepository(User);

export const getAll = async (request: Request, response: Response, next: NextFunction) => {
  try {
    console.log('getAllUsers');
    const users = await userRepository.find();
    return response.json({
      status: true,
      users,
      message: 'Users retrieved successfully',
    });
  } catch (error) {
    return response
      .status(400)
      .json({ status: false, message: 'Can not get users' });
  }
};
