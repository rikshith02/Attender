const express = require('express');
const Attendance = require('../models/Attendance');
const router = express.Router();

// Clock In
router.post('/clock-in', async (req, res) => {
  const { userId } = req.body;
  try {
    const attendance = new Attendance({ userId, clockIn: new Date() });
    await attendance.save();
    res.status(201).json({ message: 'Clock-in successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Clock Out
router.post('/clock-out', async (req, res) => {
  const { userId } = req.body;
  try {
    const attendance = await Attendance.findOne({ userId, clockOut: null });
    if (!attendance) return res.status(404).json({ message: 'No active session found' });

    attendance.clockOut = new Date();
    await attendance.save();
    res.status(200).json({ message: 'Clock-out successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
