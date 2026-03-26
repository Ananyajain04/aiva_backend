const Log = require("../models/Log");

const VALID_SOURCES = ["app", "sensor", "caregiver", "system"];
const VALID_TYPES = ["activity", "medication", "reminder", "sensor", "behaviour"];

// Add log (always from logged-in user)
exports.addLog = async (req, res) => {
  try {
    const { activity, source, type, metadata } = req.body;

    if (source && !VALID_SOURCES.includes(source)) {
      return res.status(400).json({ error: `Invalid source. Must be one of: ${VALID_SOURCES.join(", ")}` });
    }

    if (type && !VALID_TYPES.includes(type)) {
      return res.status(400).json({ error: `Invalid type. Must be one of: ${VALID_TYPES.join(", ")}` });
    }

    const log = await Log.create({
      userId: req.user.id,
      activity,
      source: source || "app",
      type: type || "activity",
      metadata: metadata || {},
    });

    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get logs for a patient (caregiver or the patient themselves)
exports.getLogs = async (req, res) => {
  try {
    const { type, source, from, to } = req.query;

    const filter = { userId: req.params.userId };

    // Optional filters
    if (type) filter.type = type;
    if (source) filter.source = source;
    if (from || to) {
      filter.createdAt = {};
      if (from) filter.createdAt.$gte = new Date(from);
      if (to) filter.createdAt.$lte = new Date(to);
    }

    const logs = await Log.find(filter).sort({ createdAt: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};