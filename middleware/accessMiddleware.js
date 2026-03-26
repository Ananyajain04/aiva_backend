const User = require("../models/User");

// 🔐 Ensure caregiver can only access their patient
const allowPatientAccess = async (req, res, next) => {
  try {
    const requestedUserId = req.params.userId;
    const currentUserId = req.user.id;
    const currentUser = await User.findById(currentUserId);
    // ✅ If patient → can only access themselves
    if (currentUser.role === "patient") {
      if (currentUserId !== requestedUserId) {
        return res.status(403).json({ message: "Access denied" });
      }
    }
    // ✅ If caregiver → must match linkedCaregiverId
    if (currentUser.role === "caregiver") {
      const patient = await User.findById(requestedUserId);

      if (!patient || patient.linkedCaregiverId?.toString() !== currentUserId) {
        return res.status(403).json({ message: "Not your patient" });
      }
    }

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = allowPatientAccess;
