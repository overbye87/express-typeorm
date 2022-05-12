import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

import root from './routes/root';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(root);

export default app;
