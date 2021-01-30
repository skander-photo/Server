import { Category } from '../../models/category';
import { getRepository } from 'typeorm';
import { Request, Response } from 'express';

class CategoriesResource {
  categoryRepository = getRepository(Category);

  all = async (req: Request, res: Response) => {
    const categories = await this.categoryRepository.find({
      relations: ['albums', 'albums.coverPicture'],
    });
    return res.send({ categories });
  };
}

export const categoriesResource = new CategoriesResource();
