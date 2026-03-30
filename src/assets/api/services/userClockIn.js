// 打卡
const api = (request) => ({ ...UserClockInInput }) => {
  const variables = { input: { ...UserClockInInput } };
  const query = `
  mutation userClockIn($input:UserClockInInput!){
    userClockIn(input: $input) {
      status
      message
    }
  }
  `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
