import { AppDataSource } from './data-source';
import { config } from './config';
import app from './app';

const PORT = process.env.PORT ?? config.port;

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}...`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// // insert new users for test
// await AppDataSource.manager.save(
//   AppDataSource.manager.create(User, {
//     firstName: 'Timber',
//     lastName: 'Saw',
//     login: 'admin',
//     email: 'admin@admin.ru',
//     password: 'admin',
//   }),
// );

// await AppDataSource.manager.save(
//   AppDataSource.manager.create(User, {
//     firstName: 'Phantom',
//     lastName: 'Assassin',
//     login: 'user',
//     email: 'user@user.ru',
//     password: 'user',
//   }),
// );

// Routes.forEach((route) => {
//   (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
//     const result = (new (route.controller as any)())[route.action](req, res, next);
//     if (result instanceof Promise) {
//       result.then(
//         (result) => (result !== null && result !== undefined ? res.send(result) : undefined),
//       );
//     } else if (result !== null && result !== undefined) {
//       res.json(result);
//     }
//   });
// });
