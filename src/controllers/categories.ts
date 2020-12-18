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
    return res.render('categories/new', { error: false });
  };

  getEditView = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) return;
    const category = await this.categoryRepository.findOne(id, {
      relations: ['albums']
    });
    return res.render('categories/edit', { category, error: false });
  };

  create = async (req: Request, res: Response) => {
    try {
      delete req.body.id;
      await this.categoryRepository.save(req.body);
      return res.redirect('/');
    } catch (err) {
      console.log(err);
      return res.render('categories/new', { error: err.message });
    }
  };

  update = async (req: Request, res: Response) => {
    console.log(req.body);
    await this.categoryRepository.update(req.body.id, { ...req.body });
    res.redirect('/');
  };

  delete = async (req: Request, res: Response) => {
    const id = req.params.id;
    await this.categoryRepository.delete(id);
    res.redirect('back');
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
