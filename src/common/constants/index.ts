import * as dotenv from 'dotenv';

dotenv.config();

export const HOSTNAME = process.env.HOSTNAME;

export const PORT = Number(process.env.PORT) || 3000;

export const DATABASE_URL = process.env.DATABASE_URL;

export const JWT_SECRET = process.env.JWT_SECRET;

export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

export const ADMIN_USERNAME = process.env.ADMIN_USERNAME;

export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export const STATIC_SERVE_ROOT = '/uploads';

export const getFileUrl = (fileName: string) =>
  `${HOSTNAME}${STATIC_SERVE_ROOT}/${fileName}`;
