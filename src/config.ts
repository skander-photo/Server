import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Loads .env file content in memory
dotenv.config();

export const PORT = process.env.PORT || 5000;

export const THUMBNAIL_WIDTH = 300; // px

export const UPLOADS_PATH = resolve('uploads');
