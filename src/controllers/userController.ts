/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    console.log(request.params.id);
    return this.userRepository.findOneBy({
      id: request.params.id,
    });
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.save(request.body);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const userToRemove = await this.userRepository.findOneBy({ id: request.params.id });
    await this.userRepository.remove(userToRemove);
  }
}
