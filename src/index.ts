/* eslint-disable no-console */

// import { runSeeders } from 'typeorm-extension';

import { config } from './config';

import app from './app';

import dataSource from './db/dataSource';

const PORT = process.env.PORT ?? config.port;

(async () => {
  try {
    await dataSource.initialize();
  } catch (error) {
    console.log(error);
  }

  // await runSeeders(dataSource, { seeds: ['src/db/seeds/**/*{.ts,.js}'] });

  app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`);
  });
})();
