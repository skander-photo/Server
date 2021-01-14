import { Request, Response } from 'express';
import { Category } from '../models/category';
import { getRepository } from 'typeorm';

class CategoriesController {
  categoryRepository = getRepository(Category);

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
    console.log(req);
    delete req.body.id;
    await this.categoryRepository.save(req.body);
    return res.redirect('/');
  };
}

export const categoriesController = new CategoriesController();
