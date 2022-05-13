/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../../db/dataSource';
import { User } from '../../entity/User';

const userRepository = AppDataSource.getRepository(User);

export const getOne = async (request: Request, response: Response, next: NextFunction) => {
  try {
    console.log('getOneUser', request.params);
    const user = await userRepository.findOneBy({
      id: Number(request.params.id),
    });
    return response.json({
      status: true,
      user,
      message: 'User retrieved successfully',
    });
  } catch (error) {
    next();
    // return response
    //   .status(400)
    //   .json({ status: false, message: 'Can not get user' });
  }
};
