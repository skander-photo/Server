import { Router } from 'express';
import { categoriesResource } from './resources/categories-resource';
import { picturesResource } from './resources/pictures-resource';

export const apiRouter = Router();

// Categories
apiRouter.get('/categories', categoriesResource.all);

// Pictures
apiRouter.get('/pictures/:albumId', picturesResource.allByAlbum);
