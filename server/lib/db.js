import mysql from "mysql2/promise";

let connection;

export const connectToDatabase = async () => {
  if (!connection) {
    try {
      connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });
      console.log("✅ Connected to DB");
    } catch (err) {
      console.error("❌ Failed to connect to DB:", err);
      throw err;
    }
  }
  return connection;
};
