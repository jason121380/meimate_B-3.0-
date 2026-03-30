// 獲取打卡統計
const api = (request) => ({ ...AllAttendanceInput }) => {
  const variables = { input: { ...AllAttendanceInput } };
  const query = `
  query attendanceRecords($input: AllAttendanceInput!){
    attendanceRecords(input:$input ) {
      userId
      userName
      userNickName
      attendanceRecord{
        isLate
        isLeaveEarly
        date
        lateMinutes
        clockInRecord{
          in{
            time
            latitude
            longitude
            isLine
            distanceValue
          }
          out{
            time
            latitude
            longitude
            isLine
            distanceValue
          }
          breakRecord{
            start{
              time
              latitude
              longitude
              isLine
              distanceValue
            }
            end{
              time
              latitude
              longitude
              isLine
              distanceValue
            }
          }
        }
      }
      totalLateTime
      totalLateMinutes
    }
   }
  `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
