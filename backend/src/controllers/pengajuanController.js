const pool = require("../config/db");
const generateTicket = require("../utils/generateTicket");
const { storeFile } = require("../utils/fileStorage");

const createPengajuan = async (req, res) => {
  try {
    const { nama_lengkap, nik, alamat, jenis_surat, keperluan } = req.body;

    if (!nama_lengkap || !nik || !alamat || !jenis_surat || !keperluan) {
      return res.status(400).json({ message: "Data pengajuan belum lengkap." });
    }

    const kode_tiket = generateTicket("PGJ");
    const file_url = await storeFile(req.file, "pengajuan");

    const [result] = await pool.query(
      `INSERT INTO pengajuan_surat
      (kode_tiket, nama_lengkap, nik, alamat, jenis_surat, keperluan, file_url)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [kode_tiket, nama_lengkap, nik, alamat, jenis_surat, keperluan, file_url]
    );

    return res.status(201).json({
      message: "Pengajuan surat berhasil dibuat.",
      data: { id: result.insertId, kode_tiket },
    });
  } catch (error) {
    return res.status(500).json({ message: "Gagal membuat pengajuan.", error: error.message });
  }
};

const getAllPengajuan = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM pengajuan_surat ORDER BY created_at DESC");
    return res.json({ data: rows });
  } catch (error) {
    return res.status(500).json({ message: "Gagal mengambil data pengajuan.", error: error.message });
  }
};

const getPengajuanById = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM pengajuan_surat WHERE id = ? LIMIT 1", [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: "Data pengajuan tidak ditemukan." });
    return res.json({ data: rows[0] });
  } catch (error) {
    return res.status(500).json({ message: "Gagal mengambil detail pengajuan.", error: error.message });
  }
};

const updatePengajuanStatus = async (req, res) => {
  try {
    const { status, catatan_admin } = req.body;
    const statuses = ["Menunggu", "Diproses", "Selesai", "Ditolak"];

    if (!status || !statuses.includes(status)) {
      return res.status(400).json({ message: "Status tidak valid." });
    }

    const [result] = await pool.query(
      "UPDATE pengajuan_surat SET status = ?, catatan_admin = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [status, catatan_admin || null, req.params.id]
    );

    if (!result.affectedRows) {
      return res.status(404).json({ message: "Data pengajuan tidak ditemukan." });
    }

    return res.json({ message: "Status pengajuan berhasil diperbarui." });
  } catch (error) {
    return res.status(500).json({ message: "Gagal memperbarui status pengajuan.", error: error.message });
  }
};

module.exports = {
  createPengajuan,
  getAllPengajuan,
  getPengajuanById,
  updatePengajuanStatus,
};
