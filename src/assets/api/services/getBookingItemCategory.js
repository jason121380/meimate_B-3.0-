// 取得設計師預約項目類別
const api = (request) => () => {
  const query = `
  query {
    getBookingItemCategory {
      id
      sort
      name
      bookingItem {
        id
        sort
        bookingItemCategoryId
        bookingItemCategoryName
        name
        lowestPrice
        highestPrice
        isUsing
        timeCost
      }
    }
  }
  `;
  return request({
    method: 'post',
    data: { query },
  });
};
export default api;
