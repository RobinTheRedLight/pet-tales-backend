import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  email_host: process.env.EMAIL_HOST,
  email_port: Number(process.env.EMAIL_PORT),
  email_user: process.env.EMAIL_USER,
  email_pass: process.env.EMAIL_PASS,
  frontend_base_url: process.env.FRONTEND_BASE_URL || 'http://localhost:3000',
};
