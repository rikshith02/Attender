const mongoose = require('mongoose');

// Define the Attendance record schema
const attendanceRecordSchema = new mongoose.Schema({
  date: { type: String, required: true },  // Format: YYYY-MM-DD
  clockInTime: { type: String },
  clockOutTime: { type: String },
  status: { type: String, enum: ['Normal', 'Late'], default: 'Normal' },
});

// Export the Attendance record schema
module.exports = mongoose.model('Attendance', attendanceRecordSchema);
