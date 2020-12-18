import { Album } from '../models/album';
import { Category } from '../models/category';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

class AlbumsController {
  categoryRepository = getRepository(Category);
  albumRepository = getRepository(Album);

  getEditView = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const albumPromise = this.albumRepository.findOne(id, { relations: ['category', 'pictures'] });
      const categoriesPromise = this.categoryRepository.find();
      const [album, categories] = await Promise.all([albumPromise, categoriesPromise]);
      const categoriesWithSelection = categories.map(cat => ({
        ...cat,
        isSelected: cat.id === album.category.id
      }));
      console.log(categoriesWithSelection);
      return res.render('albums/edit', { album, categories: categoriesWithSelection });
    } catch (err) {
      console.log(err);
      return res.redirect('/');
    }
  };

  update = async (req: Request, res: Request) => {
    const { id } = req.body;
    console.log(req.body);
  };

  create = async (req: Request, res: Response) => {
    const { categoryId } = req.body;
    if (!categoryId) {
      return res.status(StatusCodes.BAD_REQUEST).send('Category ID is missing');
    }

    try {
      const category = await this.categoryRepository.findOne(categoryId);
      if (!category) {
        return res.status(StatusCodes.BAD_REQUEST).send('Wrong category ID');
      }

      const album = this.albumRepository.create(req.body as Album);
      album.category = categoryId;
      await this.albumRepository.save(album);

      return res.sendStatus(StatusCodes.OK);
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }
  };

  setCover = async (req: Request, res: Response) => {
    const { albumId, picId } = req.body;
    await this.albumRepository.update({ id: albumId}, { coverPicture: picId});
    return res.sendStatus(StatusCodes.OK);
  }
}

export const albumsController = new AlbumsController();
