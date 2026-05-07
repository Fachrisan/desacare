const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const {
  createPengaduan,
  getAllPengaduan,
  getPengaduanById,
  updatePengaduanStatus,
} = require("../controllers/pengaduanController");

const router = express.Router();

router.post("/", upload.single("foto"), createPengaduan);
router.get("/", authMiddleware, getAllPengaduan);
router.get("/:id", authMiddleware, getPengaduanById);
router.put("/:id/status", authMiddleware, updatePengaduanStatus);

module.exports = router;
