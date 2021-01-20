import { Router } from 'express';
import { albumsController } from './controllers/albums-controller';
import { categoriesController } from './controllers/categories-controller';

export const router = Router();

// Home page
router.get('/', categoriesController.indexView);

// Categories
router.get('/categories', categoriesController.indexView);
router.get('/categories/new', categoriesController.newView);
router.post('/categories/create', categoriesController.create);
router.get('/categories/edit/:id', categoriesController.editView);
router.post('/categories/update', categoriesController.update);
router.get('/categories/delete/:id', categoriesController.delete);

// Albums
router.get('/albums', albumsController.indexView);
router.get('/albums/new', albumsController.newView);
router.post('/albums/create', albumsController.create);
router.get('/albums/edit/:id', albumsController.editView);
router.post('/albums/update', albumsController.update);
router.get('/albums/delete/:id', albumsController.delete);
