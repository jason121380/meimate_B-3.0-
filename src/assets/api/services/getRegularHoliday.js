// 固定公休清單
const api = (request) => ({ userId }) => {
  const variables = { userId };
  const query = `
  query getRegularHoliday($userId: ID!){
    getRegularHoliday(userId:$userId)
  }
  `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
