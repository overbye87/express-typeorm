/* eslint-disable no-shadow */
import * as express from 'express';
import { Request, Response } from 'express';
import { AppDataSource } from './data-source';

import { User } from './entity/User';
import { Routes } from './routes/root';

AppDataSource.initialize().then(async () => {
  // create express app
  const app = express();
  app.use(express.json());

  // register express routes from defined application routes
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

  // setup express app here
  // ...

  // start express server
  app.listen(3000);

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

  console.log('Express server has started on port 3000. Open http://localhost:3000/users to see results');
}).catch((error) => console.log(error));
