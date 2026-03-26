const mongoose = require("mongoose");

const medicationSchema = new mongoose.Schema({
  userId: String,
  medicineName: String,
  dosage: String,
  timing: [String],
});

module.exports = mongoose.model("Medication", medicationSchema);