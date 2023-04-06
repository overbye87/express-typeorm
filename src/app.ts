import * as express from 'express';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';

import rootRouter from './routes/rootRouter';
import errorHandler from './middlewares/errorHandler';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// app.use(cookieParser);
//app.use(rootRouter);

//app.use(errorHandler);
app.get('/', (req, res) => {
  res.send('Hello World!')
})

export default app;
