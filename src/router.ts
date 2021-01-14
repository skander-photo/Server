import { Router } from 'express';
import { categoriesController } from './controllers/categories-controller';

export const router = Router();

// Home page
router.get('/', categoriesController.indexView);

// Categories
router.get('/categories', categoriesController.indexView);
router.get('/categories/new', categoriesController.newView);
router.post('/categories/create', categoriesController.create);
