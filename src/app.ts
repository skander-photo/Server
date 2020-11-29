import * as express from 'express';
import * as morgan from 'morgan';
import * as cors from 'cors';
import { PORT } from './config';
import { createConnection } from 'typeorm';

// Setup database first
createConnection().then(async () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(morgan('dev'));

  const { router } = await import('./router');
  app.use('/api', router);

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
