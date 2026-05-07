const express = require("express");
const { checkStatus } = require("../controllers/statusController");

const router = express.Router();

router.get("/:kode_tiket", checkStatus);

module.exports = router;
