/* eslint-disable no-shadow */
import * as express from 'express';
import * as cors from 'cors';

import { Request, Response } from 'express';
import { AppDataSource } from './data-source';

import { User } from './entity/User';
import { Routes } from './routes/root';
import { config } from './config';

const PORT = process.env.PORT ?? config.port;

AppDataSource.initialize().then(async () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  Routes.forEach((route) => {
    (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
      const result = (new (route.controller as any)())[route.action](req, res, next);
      if (result instanceof Promise) {
        result.then(
          (result) => (result !== null && result !== undefined ? res.send(result) : undefined),
        );
      } else if (result !== null && result !== undefined) {
        res.json(result);
      }
    });
  });

  app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`);
  });

  // insert new users for test
  await AppDataSource.manager.save(
    AppDataSource.manager.create(User, {
      firstName: 'Timber',
      lastName: 'Saw',
      login: 'admin',
      email: 'admin@admin.ru',
      password: 'admin',
    }),
  );

  await AppDataSource.manager.save(
    AppDataSource.manager.create(User, {
      firstName: 'Phantom',
      lastName: 'Assassin',
      login: 'user',
      email: 'user@user.ru',
      password: 'user',
    }),
  );
}).catch((error) => console.log(error));
