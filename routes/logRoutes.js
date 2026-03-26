const express = require("express");
const router = express.Router();

const { addLog, getLogs } = require("../controllers/logController");
const protect = require("../middleware/authMiddleware");
const allowPatientAccess = require("../middleware/accessMiddleware");

// 🔐 Protect + Authorize
router.get("/:userId", protect, allowPatientAccess, getLogs);
router.post("/", protect, addLog);

module.exports = router;