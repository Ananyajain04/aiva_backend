const express = require("express");
const protect = require("../middleware/authMiddleware");
const router = express.Router();
const { getAllPatients } = require("../controllers/userController");

const { registerUser, loginUser, getUser, linkPatient, getMyPatients } = require("../controllers/userController");

router.get("/my-patients", protect, getMyPatients);
router.get("/me", protect, getUser);
router.get("/all-patients",protect,getAllPatients);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/link", protect, linkPatient);

module.exports = router;