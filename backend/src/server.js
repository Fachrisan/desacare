const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const pool = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const pengajuanRoutes = require("./routes/pengajuanRoutes");
const pengaduanRoutes = require("./routes/pengaduanRoutes");
const statusRoutes = require("./routes/statusRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.resolve(__dirname, "../uploads")));

app.get("/", (req, res) => {
  return res.json({ message: "DesaCare API running" });
});

app.get("/api/health", async (req, res) => {
  try {
    const databaseInfo = await pool.testDatabaseConnection();
    return res.json({
      message: "Backend DesaCare berjalan.",
      database: "connected",
      databaseInfo,
      databaseConfig: pool.getDatabaseConfigSummary(),
    });
  } catch (error) {
    console.error("ERROR HEALTHCHECK DATABASE:", error);
    return res.status(500).json({
      message: "Backend berjalan, database bermasalah.",
      error: error.message,
      databaseConfig: pool.getDatabaseConfigSummary(),
    });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/pengajuan", pengajuanRoutes);
app.use("/api/pengaduan", pengaduanRoutes);
app.use("/api/status", statusRoutes);

app.use((err, req, res, next) => {
  console.error("ERROR GLOBAL EXPRESS:", err);

  if (err && err.message === "Tipe file tidak didukung.") {
    return res.status(400).json({ message: err.message });
  }

  if (err && err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ message: "Ukuran file maksimal 5MB." });
  }

  return res.status(500).json({ message: "Terjadi kesalahan server.", error: err.message });
});

const PORT = Number(process.env.PORT || 5000);

app.listen(PORT, async () => {
  console.log(`Server DesaCare berjalan di http://localhost:${PORT}`);
  console.log("KONFIGURASI DATABASE:", pool.getDatabaseConfigSummary());

  try {
    const databaseInfo = await pool.testDatabaseConnection();
    console.log("KONEKSI DATABASE BERHASIL:", databaseInfo);
  } catch (error) {
    console.error("KONEKSI DATABASE GAGAL:", error);
  }
});
