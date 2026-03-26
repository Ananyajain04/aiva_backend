const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  userId: String,
  fileUrl: String,
  summary: String,
});

module.exports = mongoose.model("Report", reportSchema);