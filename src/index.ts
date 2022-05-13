/* eslint-disable no-console */
import { AppDataSource } from './db/dataSource';
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
