const pool = require("../config/db");
const generateTicket = require("../utils/generateTicket");
const { storeFile } = require("../utils/fileStorage");

const createPengaduan = async (req, res) => {
  try {
    const { nama_pelapor, nomor_hp, kategori, lokasi, isi_pengaduan } = req.body;

    if (!nama_pelapor || !nomor_hp || !kategori || !lokasi || !isi_pengaduan) {
      return res.status(400).json({ message: "Data pengaduan belum lengkap." });
    }

    const kode_tiket = generateTicket("PGD");
    const foto_url = await storeFile(req.file, "pengaduan");

    const [result] = await pool.query(
      `INSERT INTO pengaduan
      (kode_tiket, nama_pelapor, nomor_hp, kategori, lokasi, isi_pengaduan, foto_url)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [kode_tiket, nama_pelapor, nomor_hp, kategori, lokasi, isi_pengaduan, foto_url]
    );

    return res.status(201).json({
      message: "Pengaduan berhasil dibuat.",
      data: { id: result.insertId, kode_tiket },
    });
  } catch (error) {
    return res.status(500).json({ message: "Gagal membuat pengaduan.", error: error.message });
  }
};

const getAllPengaduan = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM pengaduan ORDER BY created_at DESC");
    return res.json({ data: rows });
  } catch (error) {
    return res.status(500).json({ message: "Gagal mengambil data pengaduan.", error: error.message });
  }
};

const getPengaduanById = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM pengaduan WHERE id = ? LIMIT 1", [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: "Data pengaduan tidak ditemukan." });
    return res.json({ data: rows[0] });
  } catch (error) {
    return res.status(500).json({ message: "Gagal mengambil detail pengaduan.", error: error.message });
  }
};

const updatePengaduanStatus = async (req, res) => {
  try {
    const { status, catatan_admin } = req.body;
    const statuses = ["Menunggu", "Diproses", "Selesai", "Ditolak"];

    if (!status || !statuses.includes(status)) {
      return res.status(400).json({ message: "Status tidak valid." });
    }

    const [result] = await pool.query(
      "UPDATE pengaduan SET status = ?, catatan_admin = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [status, catatan_admin || null, req.params.id]
    );

    if (!result.affectedRows) {
      return res.status(404).json({ message: "Data pengaduan tidak ditemukan." });
    }

    return res.json({ message: "Status pengaduan berhasil diperbarui." });
  } catch (error) {
    return res.status(500).json({ message: "Gagal memperbarui status pengaduan.", error: error.message });
  }
};

module.exports = {
  createPengaduan,
  getAllPengaduan,
  getPengaduanById,
  updatePengaduanStatus,
};
