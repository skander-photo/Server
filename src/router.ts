import { picturesResource } from './resources/pictures';
import { categoriesResource } from './resources/categories';
import { albumsResource } from './resources/albums';
import { Router } from 'express';

export const router = Router();

router.get('/', (req, res) => res.send('hello'));

// Categories
router.get('/categories', categoriesResource.getAll);
router.post('/categories', categoriesResource.create);
router.put('/categories', categoriesResource.update);

// Albums
router.post('/albums', albumsResource.create);

// Pictures
router.get('/pictures/:albumId', picturesResource.getAllByAlbum);
