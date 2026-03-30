// 取得打卡列表
const api = (request) => ({ ...DailyClockInRecord }) => {
  const variables = { ...DailyClockInRecord };
  const query = `
  query dailyClockInRecord($date:DateTime,$designerId: ID){
    dailyClockInRecord(date:$date,designerId:$designerId){
      userId
      userName
      userNickName
      userNo
      isLate
      isLeaveEarly
      clockInRecord{
        in{
          time
          latitude
          longitude
          isLine
        }
        out{
          time
          latitude
          longitude
          isLine
        }
        breakRecord{
          start{
            time
            latitude
            longitude
            isLine
          }
          end{
            time
            latitude
            longitude
            isLine
          }
        }
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
