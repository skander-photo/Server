import * as dotenv from 'dotenv';

// Loads .env file content in memory
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const DB_URL =
  process.env.DB_URL || 'mongodb://localhost/skander-photography';
