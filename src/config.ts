import dotenv from 'dotenv';

const env = process.env;

export const database = env.MONGO_URI;
export const jwtSecret = env.JWT_SECRET;