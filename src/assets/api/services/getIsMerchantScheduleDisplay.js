// 指定預約
const api = (request) => () => {
  const query = `
  query {
    getIsMerchantScheduleDisplay
  }
  `;
  return request({
    method: 'post',
    data: { query },
  });
};
export default api;
