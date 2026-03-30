// 取得設計師可預約的項目
const api = (request) => () => {
  const query = `
  query {
    getBookingItem{
      id
      sort
      name
      lowestPrice
      highestPrice
    }
  }
  `;
  return request({
    method: 'post',
    data: { query },
  });
};
export default api;
