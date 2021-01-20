import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Category } from '../models/category';
import { Album } from '../models/album';

class CategoriesController {
  categoryRepository = getRepository(Category);
  albumRepository = getRepository(Album);

  indexView = async (req: Request, res: Response) => {
    const categories = await this.categoryRepository.find({
      relations: ['albums'],
    });

    return res.render('categories/index', { categories });
  };

  newView = (req: Request, res: Response) => {
    return res.render('categories/new');
  };

  create = async (req: Request, res: Response) => {
    // Cleanup and save category
    let albumTitles = req.body.albums;
    delete req.body.id;
    delete req.body.albums;

    try {
      const category = await this.categoryRepository.save(req.body);

      // Save albums
      if (albumTitles) {
        // Cast albums to array if it's a string
        if (typeof albumTitles === 'string') {
          albumTitles = [albumTitles];
        }

        const albums = albumTitles.map((title) => ({
          title,
          category: category.id,
        }));

        await this.albumRepository.save(albums);
      }

      return res.redirect('/');
    } catch (err) {
      console.log(err);
      return res.render('categories/new', { error: err });
    }
  };
}

export const categoriesController = new CategoriesController();
