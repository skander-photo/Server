import { Request, Response } from 'express';
import { Category } from '../models/category';
import { getRepository } from 'typeorm';

class CategoriesController {
  categoryRepository = getRepository(Category);

  getIndexView = async (req: Request, res: Response) => {
    const categories = await this.categoryRepository.find({
      relations: ['albums'],
    });
    return res.render('categories/index', { categories });
  };

  getNewView = (req: Request, res: Response) => {
    return res.render('categories/new');
  };

  create = async (req: Request, res: Response) => {
    try {
      await this.categoryRepository.save(req.body);
      return res.redirect('/categories');
    } catch (err) {
      console.log(err);
      return res.render('categories/new', { error: err.message });
    }
  };

  // API Calls
  getAllCategories = async (req: Request, res: Response) => {
    const categories = await this.categoryRepository.find({
      relations: ['albums'],
    });
    return res.send({ categories });
  };
}

export const categoriesController = new CategoriesController();
