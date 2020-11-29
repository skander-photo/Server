import { Category } from '../models/category';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getRepository } from 'typeorm';

class CategoriesResource {
  categoryRepository = getRepository(Category);

  getAll = async (req: Request, res: Response) => {
    const categories = await this.categoryRepository.find({
      relations: ['albums'],
    });
    return res.send({ categories });
  };

  create = async (req: Request, res: Response) => {
    try {
      await this.categoryRepository.save(req.body);
      return res.sendStatus(StatusCodes.OK);
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
    }
  };

  update = async (req: Request, res: Response) => {
    const { id, name } = req.body;
    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).send('Category ID is missing to update');
    }

    try {
      await this.categoryRepository.update({ id }, { name });
      return res.sendStatus(StatusCodes.OK);
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
    }
  };
}

export const categoriesResource = new CategoriesResource();
