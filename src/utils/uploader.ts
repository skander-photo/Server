import * as multer from 'multer';
import { UPLOADS_PATH } from '../config';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_PATH);
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}_${file.originalname}`;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  const isImage = file.mimetype == 'image/jpeg' || file.mimetype == 'image/png';
  cb(null, isImage);
};

export const uploader = multer({ storage, fileFilter });
