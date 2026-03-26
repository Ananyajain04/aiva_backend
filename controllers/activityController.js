const Activity = require("../models/Activity");

// Add activity
exports.addActivity = async (req, res) => {
  try {
    const { patientId, name, steps } = req.body;

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