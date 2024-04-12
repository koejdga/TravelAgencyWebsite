import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

export async function connectToDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
  });

  return connection;
}
