const Medication = require("../models/Medication");

// CAREGIVER adds medication
exports.addMedication = async (req, res) => {
  try {
    const { patientId, medicineName, dosage, timing } = req.body;

    const med = await Medication.create({
      userId: patientId,
      medicineName,
      dosage,
      timing,
    });

    res.status(201).json(med);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get medications
exports.getMedications = async (req, res) => {
  try {
    const meds = await Medication.find({ userId: req.params.userId });
    res.json(meds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};