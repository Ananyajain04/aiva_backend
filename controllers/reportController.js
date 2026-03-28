const Report = require("../models/Report");
const User = require("../models/User");
// CAREGIVER uploads report
exports.uploadReport = async (req, res) => {
  try {
    const { patientId } = req.body;
    const patient = await User.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    if (patient.linkedCaregiverId?.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not your patient" });
    }
    const report = await Report.create({
      userId: patientId,
      fileUrl: "dummy.pdf",   // replace with real upload URL when file storage is set up
      summary: "Pending",     // ML will update this later
    });

    res.status(201).json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get reports
exports.getReports = async (req, res) => {
  try {
    const reports = await Report.find({ userId: req.params.userId });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};