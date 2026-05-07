import 'dotenv/config';
import path from 'path';
import morgan from 'morgan';
import express from 'express';
import {createServer} from 'http';

import routes from './routes/index.js';
import errorHandler from './milddlewares/errorHandler.js';

const app = express();

const {PORT} = process.env || 3000;

app.set('views', path.resolve('views'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve('public')));

app.use(routes);

app.use(errorHandler.notFound);
app.use(errorHandler.errors);

const server = createServer(app);

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});