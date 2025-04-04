import { configDotenv } from 'dotenv';
import Mysql from 'mysql2/promise';
configDotenv();

export const connection = await Mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME,
});
