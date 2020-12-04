import * as express from 'express';
import * as morgan from 'morgan';
import * as cors from 'cors';
import { join, resolve } from 'path';
import { PORT } from './config';
import { createConnection } from 'typeorm';

// Setup database first
createConnection().then(async () => {
  const app = express();

  app.set('views', join(__dirname, 'views'));
  app.set('view engine', 'hbs');
  app.use(express.static(resolve('public')));

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(morgan('dev'));

  const { router, apiRouter } = await import('./router');
  app.use('/', router);
  app.use('/api', apiRouter);

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
