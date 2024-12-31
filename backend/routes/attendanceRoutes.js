const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Get today's attendance for a user
router.get('/:email/:date', async (req, res) => {
  const { email, date } = req.params;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const attendanceRecord = user.attendanceList.find(record => record.date === date);
    if (!attendanceRecord) return res.status(404).json({ message: 'No attendance record found for today' });

    res.json(attendanceRecord);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendance' });
  }
});

// Clock In for a user
router.post('/clockIn', async (req, res) => {
  const { userEmail, date, clockInTime, status } = req.body;

  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const existingRecord = user.attendanceList.find(record => record.date === date);
    if (existingRecord) return res.status(400).json({ message: 'Attendance already recorded for today' });

    user.attendanceList.push({ date, clockInTime, status });
    await user.save();

    res.status(201).json({ message: 'Clocked in successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error clocking in' });
  }
});

// Clock Out for a user
router.put('/clockOut', async (req, res) => {
  const { userEmail, date, clockOutTime } = req.body;

  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const attendanceRecord = user.attendanceList.find(record => record.date === date);
    if (!attendanceRecord) return res.status(404).json({ message: 'No clock-in record found for today' });

    attendanceRecord.clockOutTime = clockOutTime;
    await user.save();

    res.status(200).json({ message: 'Clocked out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error clocking out' });
  }
});

module.exports = router;
