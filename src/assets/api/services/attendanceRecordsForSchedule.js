const api = (request) => ({ ...AllAttendanceInput }) => {
  const variables = { input: { ...AllAttendanceInput } };
  const query = `
    query AttendanceRecords($input: AllAttendanceInput!) {
      attendanceRecords(input: $input) {
        attendanceRecord {
          date
          clockInSetting {
            color
            name
            clockInHour
            clockInMinute
            clockOutHour
            clockOutMinute
          }
          lateMinutes
        }
        clockInSettings {
          name
          id
          color
          clockInHour
          clockInMinute
          clockOutHour
          clockOutMinute
        }
      }
    }
  `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
