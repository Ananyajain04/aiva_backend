const express = require("express");
const protect = require("../middleware/authMiddleware");
const allowPatientAccess = require("../middleware/accessMiddleware");
const router = express.Router();
const {
  uploadReport,
  getReports,
} = require("../controllers/reportController");

router.post("/", protect,uploadReport);
router.get("/:userId", protect,allowPatientAccess, getReports);

module.exports = router;