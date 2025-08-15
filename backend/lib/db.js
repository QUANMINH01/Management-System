import mysql from "mysql2/promise";

let pool;

export const connectToDatabase = async () => {
  if (!pool) {
    try {
      pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });
      console.log("✅ Connected to DB (pool)");
    } catch (err) {
      console.error("❌ Failed to connect to DB:", err);
      throw err;
    }
  }
  return pool;
};
