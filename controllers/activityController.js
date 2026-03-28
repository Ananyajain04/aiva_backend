const Activity = require("../models/Activity");
const User = require("../models/User");
// Add activity
exports.addActivity = async (req, res) => {
  try {
    const { patientId, name, steps } = req.body;
    const patient = await User.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    if (patient.linkedCaregiverId?.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not your patient" });
    }
    const activity = await Activity.create({
      userId: patientId,
      name,
      steps,
    });

    res.status(201).json(activity);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get activities
exports.getActivities = async (req, res) => {
  try {
    const activities = await Activity.find({ userId: req.params.userId });
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};