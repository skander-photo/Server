import * as sharp from 'sharp';
import { join } from 'path';
import { THUMBNAIL_WIDTH, UPLOADS_PATH } from '../config';

export function generateThumbnail(filePath: string, fileName: string) {
  const newFileName = `thumbnail_${fileName}`;
  const newFilePath = join(UPLOADS_PATH, newFileName);

  sharp(filePath).resize(THUMBNAIL_WIDTH).toFile(newFilePath, (err, resizedImage) => {
    if (err) {
      throw err;
    }
  });

  return newFileName;
}
