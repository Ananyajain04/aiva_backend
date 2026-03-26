const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  userId: String, // patient

  name: String, // "Make Tea"

  steps: [
    {
      stepNumber: Number,
      instruction: String,
    },
  ],
});

module.exports = mongoose.model("Activity", activitySchema);