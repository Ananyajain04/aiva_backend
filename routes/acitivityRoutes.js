const express = require("express");
const router = express.Router();

const {
  addActivity,
  getActivities,
} = require("../controllers/activityController");

const protect = require("../middleware/authMiddleware");
const allowPatientAccess = require("../middleware/accessMiddleware");

router.post("/", protect,addActivity);
router.get("/:userId", protect, allowPatientAccess, getActivities);

module.exports = router;