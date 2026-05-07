const pool = require("../config/db");

const checkStatus = async (req, res) => {
  try {
    const { kode_tiket } = req.params;

    const [pengajuanRows] = await pool.query(
      "SELECT 'pengajuan_surat' AS jenis, kode_tiket, status, catatan_admin, created_at, updated_at FROM pengajuan_surat WHERE kode_tiket = ? LIMIT 1",
      [kode_tiket]
    );

    if (pengajuanRows.length) {
      return res.json({ data: pengajuanRows[0] });
    }

    const [pengaduanRows] = await pool.query(
      "SELECT 'pengaduan' AS jenis, kode_tiket, status, catatan_admin, created_at, updated_at FROM pengaduan WHERE kode_tiket = ? LIMIT 1",
      [kode_tiket]
    );

    if (pengaduanRows.length) {
      return res.json({ data: pengaduanRows[0] });
    }

    return res.status(404).json({ message: "Kode tiket tidak ditemukan." });
  } catch (error) {
    return res.status(500).json({ message: "Gagal cek status.", error: error.message });
  }
};

module.exports = {
  checkStatus,
};
