/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

const userRepository = AppDataSource.getRepository(User);

const check = async (request: Request, response: Response, next: NextFunction) => {
  return userRepository.findOneBy({
    id: Number(request.params.id),
  });
};

const authentication = async (request: Request, response: Response, next: NextFunction) => {
  try {
    console.log('authentication', request.body);
    if (!request.body.email || !request.body.password) {
      return response
        .status(400)
        .json({ status: false, message: 'Invalid request body' });
    }
    // const user = await userRepository.findOneBy({
    //   id: Number(request.params.id),
    // });
    // // insert new users for test
    await AppDataSource.manager.save(
      AppDataSource.manager.create(User, {
        email: 'asd@asd.ru',
        password: 'asd',
      }),
    );
    return response.json({
      status: true,
      user: request.body,
      message: 'User retrieved successfully',
    });
  } catch (error) {
    return response
      .status(400)
      .json({ status: false, message: 'Can not get user' });
  }
};

const registration = async (request: Request, response: Response, next: NextFunction) => {
  return userRepository.save(request.body);
};

export default {
  check,
  authentication,
  registration,
};
