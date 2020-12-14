import { Album } from '../models/album';
import { Picture } from '../models/picture';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { generateThumbnail } from '../utils/thumbnail-generator';

class PicturesController {
  albumRepository = getRepository(Album);
  pictureRepository = getRepository(Picture);

  getPicturesByAlbumView = async (req: Request, res: Response) => {
    const albumId = req.params.id;
    const album = await this.albumRepository.findOne(albumId, {
      relations: ['pictures'],
    });
    return res.render('pictures/by-album', { album });
  };

  upload = async (req: Request, res: Response) => {
    const { albumId } = req.body;

    try {
      const uploadedFiles = req.files as Express.Multer.File[];
      if (uploadedFiles && uploadedFiles.length > 0) {
        // Create thumbnails foreach uploaded files
        const thumbnails = uploadedFiles.map(file => generateThumbnail(file.path, file.filename));
        const pictures = thumbnails.map((fileNameThumbnail, index) => ({
          fileNameLarge: uploadedFiles[index].filename,
          fileNameThumbnail,
          album: albumId,
        }));
        await this.pictureRepository.save(pictures);
      }
    } catch (err) {
      console.log(err);
    }

    return res.redirect(`/albums/${albumId}/pictures`);
  }

  // API Calls
  getAllPicturesByAlbum = async (req: Request, res: Response) => {
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

export const picturesController = new PicturesController();
