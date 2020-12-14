import { picturesController } from './controllers/pictures';
import { categoriesController } from './controllers/categories';
import { albumsController } from './controllers/albums';
import { uploader } from './utils/uploader';
import { Router } from 'express';

///// API
export const apiRouter = Router();
apiRouter.get('/categories', categoriesController.getAllCategories);
apiRouter.get('/pictures/:albumId', picturesController.getAllPicturesByAlbum);

///// Classic Router (management only)
export const router = Router();
router.get('/', (req, res) => res.redirect('/categories'));
// Categories
router.get('/categories', categoriesController.getIndexView);
router.get('/categories/new', categoriesController.getNewView);
router.post('/categories/new', categoriesController.create);
// Albums
router.get('/albums/edit/:id', albumsController.getEditView);
router.post('/albums/update', albumsController.update);
router.post('/albums/new', albumsController.create);
// Pictures
router.get('/albums/:id/pictures', picturesController.getPicturesByAlbumView);
router.post('/pictures/upload', uploader.array('pictures'), picturesController.upload);
