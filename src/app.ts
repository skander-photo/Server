import * as express from 'express';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as layouts from 'express-ejs-layouts';
import { join, resolve } from 'path';
import { PORT, UPLOADS_PATH } from './config';
import { createConnection } from 'typeorm';

// Setup database first
createConnection().then(async () => {
  const app = express();

  // View engine
  app.use(layouts);
  app.set('views', join(__dirname, 'views'));
  app.set('view engine', 'ejs');
  // Static
  app.use(express.static(resolve('public')));
  app.use('/uploads', express.static(UPLOADS_PATH));
  // API config
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(morgan('dev'));
  // Router
  const { router, apiRouter } = await import('./router');
  app.use('/', router);
  app.use('/api', apiRouter);

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
