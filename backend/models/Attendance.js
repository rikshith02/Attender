const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  clockIn: { type: Date },
  clockOut: { type: Date },
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
