const express = require("express");
const protect = require("../middleware/authMiddleware");
const router = express.Router();
const { registerUser, loginUser, getUser, linkPatient, getMyPatients } = require("../controllers/userController");

router.get("/my-patients", protect, getMyPatients);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/link", protect, linkPatient);
router.get("/me", protect, getUser);

module.exports = router;