const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  userId: String,
  activity: String, // e.g. "ate_food", "idle"
  source: String,   // "sensor" or "app"
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Log", logSchema);