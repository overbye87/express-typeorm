/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

const userRepository = AppDataSource.getRepository(User);

const getAllUsers = async (request: Request, response: Response, next: NextFunction) => {
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

const getOneUser = async (request: Request, response: Response, next: NextFunction) => {
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
    return response
      .status(400)
      .json({ status: false, message: 'Can not get user' });
  }
};

const addUser = async (request: Request, response: Response, next: NextFunction) => {
  try {
    console.log('addUser', request.body);
    // const user = await userRepository.findOneBy({
    //   id: Number(request.params.id),
    // });
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

const deleteUser = async (request: Request, response: Response, next: NextFunction) => {
  const userToRemove = await userRepository.findOneBy({ id: Number(request.params.id) });
  await userRepository.remove(userToRemove);
};

export default {
  getAllUsers,
  getOneUser,
  addUser,
  deleteUser,
};
