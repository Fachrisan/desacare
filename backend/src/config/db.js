const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

const requiredEnv = ["DB_HOST", "DB_USER", "DB_NAME"];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);

if (missingEnv.length) {
  console.error("KONFIGURASI DATABASE TIDAK LENGKAP:", {
    missing: missingEnv,
    configured: {
      DB_HOST: Boolean(process.env.DB_HOST),
      DB_PORT: Boolean(process.env.DB_PORT),
      DB_USER: Boolean(process.env.DB_USER),
      DB_PASSWORD: Boolean(process.env.DB_PASSWORD),
      DB_NAME: Boolean(process.env.DB_NAME),
    },
  });
}

const dbPort = Number(process.env.DB_PORT || 3306);
const useSsl = process.env.DB_SSL === "true";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: dbPort,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: Number(process.env.DB_CONNECT_TIMEOUT || 10000),
  ssl: useSsl
    ? {
        rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED !== "false",
      }
    : undefined,
});

const getDatabaseConfigSummary = () => ({
  hostConfigured: Boolean(process.env.DB_HOST),
  hostLooksLocal:
    process.env.DB_HOST === "localhost" ||
    process.env.DB_HOST === "127.0.0.1" ||
    process.env.DB_HOST === "mysql",
  port: dbPort,
  userConfigured: Boolean(process.env.DB_USER),
  passwordConfigured: Boolean(process.env.DB_PASSWORD),
  databaseConfigured: Boolean(process.env.DB_NAME),
  database: process.env.DB_NAME,
  sslEnabled: useSsl,
});

const testDatabaseConnection = async () => {
  if (missingEnv.length) {
    throw new Error(`Environment database belum lengkap: ${missingEnv.join(", ")}`);
  }

  const [rows] = await pool.query("SELECT DATABASE() AS database_name, NOW() AS database_time");
  return rows[0];
};

pool.getDatabaseConfigSummary = getDatabaseConfigSummary;
pool.testDatabaseConnection = testDatabaseConnection;

module.exports = pool;
