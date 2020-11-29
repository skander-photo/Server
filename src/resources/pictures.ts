import { Album } from '../models/album';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

class PicturesResource {
  albumRepository = getRepository(Album);

  getAllByAlbum = async (req: Request, res: Response) => {
    const { albumId } = req.params;
    try {
      const album = await this.albumRepository.findOne(albumId, {
        relations: ['pictures'],
      });

      if (!album) {
        return res.status(StatusCodes.BAD_REQUEST).send('Wrong album ID');
      }
      return res.send({ pictures: album.pictures });
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    }
  };
}

export const picturesResource = new PicturesResource();
