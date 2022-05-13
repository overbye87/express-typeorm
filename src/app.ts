import * as express from 'express';
import * as cors from 'cors';

import rootRouter from './routes/rootRouter';
import errorHandler from './middlewares/errorHandler';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(rootRouter);

app.use(errorHandler);

export default app;
