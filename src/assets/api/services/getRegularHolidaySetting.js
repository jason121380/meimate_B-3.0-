// 固定公休清單
const api = (request) => ({ userId }) => {
  const variables = { userId };
  const query = `
  query getRegularHolidaySetting($userId: ID!){
    getRegularHolidaySetting(userId:$userId) {
      allDay
      specificTime{
        week
        startHour
        startMinute
        endHour
        endMinute
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
