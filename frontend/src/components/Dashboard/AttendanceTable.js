import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AttendanceTable = () => {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      const res = await axios.get('/api/attendance');
      setAttendance(res.data);
    };

    fetchAttendance();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Employee</th>
          <th>Clock-In</th>
          <th>Clock-Out</th>
        </tr>
      </thead>
      <tbody>
        {attendance.map((entry) => (
          <tr key={entry._id}>
            <td>{entry.userId.name}</td>
            <td>{new Date(entry.clockIn).toLocaleString()}</td>
            <td>{entry.clockOut ? new Date(entry.clockOut).toLocaleString() : 'N/A'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AttendanceTable;
