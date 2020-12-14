import * as dotenv from 'dotenv';
import { resolve, join } from 'path';

// Loads .env file content in memory
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const DB_URL =
  process.env.DB_URL || 'mongodb://localhost/skander-photography';

export const THUMBNAIL_WIDTH = 300; // px
export const UPLOADS_PATH = resolve('uploads');
