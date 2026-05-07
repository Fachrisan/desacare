const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const {
  createPengajuan,
  getAllPengajuan,
  getPengajuanById,
  updatePengajuanStatus,
} = require("../controllers/pengajuanController");

const router = express.Router();

router.post("/", upload.single("file"), createPengajuan);
router.get("/", authMiddleware, getAllPengajuan);
router.get("/:id", authMiddleware, getPengajuanById);
router.put("/:id/status", authMiddleware, updatePengajuanStatus);

module.exports = router;
