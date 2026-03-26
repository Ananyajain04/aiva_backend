const express = require("express");
const protect = require("../middleware/authMiddleware");
const allowPatientAccess = require("../middleware/accessMiddleware");
const router = express.Router();
const {
  addMedication,
  getMedications,
} = require("../controllers/medicationController");


router.post("/",protect,allowPatientAccess, addMedication);
router.get("/:userId", protect,allowPatientAccess, getMedications);

module.exports = router;