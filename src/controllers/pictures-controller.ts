import { Request, Response } from 'express';
import { generateThumbnail } from '../utils/thumbnail-generator';
import { getRepository } from 'typeorm';
import { Album } from '../models/album';
import { Picture } from '../models/picture';
import { StatusCodes } from 'http-status-codes';
import { join } from 'path';
import { UPLOADS_PATH } from '../config';
import { unlink } from 'fs/promises';

class PicturesController {
  albumRepository = getRepository(Album);
  pictureRepository = getRepository(Picture);

  indexView = async (req: Request, res: Response) => {
    const { albumId } = req.params;
    const album = await this.albumRepository.findOne(albumId, {
      relations: ['pictures'],
    });
    return res.render('pictures/index', { album });
  };

  upload = async (req: Request, res: Response) => {
    const { albumId } = req.body;
    try {
      const uploadedFiles = req.files as Express.Multer.File[];
      if (uploadedFiles && uploadedFiles.length > 0) {
        // Create thumbnails foreach uploaded files
        const generateThumbnails = uploadedFiles.map((file) =>
          generateThumbnail(file.path, file.filename)
        );
        const thumbnails = await Promise.all(generateThumbnails);

        const pictures = thumbnails.map((fileNameThumbnail, index) => ({
          fileNameLarge: uploadedFiles[index].filename,
          fileNameThumbnail,
          album: albumId,
        }));
        await this.pictureRepository.save(pictures);
      }
      return res.redirect('back');
    } catch (err) {
      console.log(err);
      return res.render('pictures/index', { error: err });
    }
  };

  delete = async (req: Request, res: Response) => {
    const { picId } = req.body;
    try {
      const picture = await this.pictureRepository.findOne(picId);
      if (picture) {
        // delete from db
        const deleteFromDb = this.pictureRepository.delete(picId);
        // delete from hard drive
        const orignalPath = join(UPLOADS_PATH, picture.fileNameLarge);
        const deleteOriginalFile = unlink(orignalPath);
        const thumbailPath = join(UPLOADS_PATH, picture.fileNameThumbnail);
        const deleteThumbnail = unlink(thumbailPath);

        await Promise.all([deleteFromDb, deleteOriginalFile, deleteThumbnail]);
        return res.sendStatus(StatusCodes.OK);
      }
    } catch (err) {
      console.log(err);
      return res.render('pictures/index', { error: err });
    }
  };
}

export const picturesController = new PicturesController();
