import * as express from 'express';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as nunjucks from 'nunjucks';
import { createConnection } from 'typeorm';
import { resolve, join } from 'path';
import { PORT, UPLOADS_PATH } from './config';

// Setup database first
createConnection().then(async () => {
  const app = express();
  // View engine
  app.set('view engine', 'html');
  nunjucks.configure(join(__dirname, 'views'), {
    autoescape: true,
    express: app,
  });
  // Static
  app.use(express.static(resolve('static')));
  app.use('/uploads', express.static(UPLOADS_PATH));
  // API Config
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(morgan('dev'));
  // Router
  const { router } = await import('./router');
  app.use('/', router);
  // API Router
  const { apiRouter } = await import('./api/api-router');
  app.use('/api', apiRouter);
  // Launch
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
