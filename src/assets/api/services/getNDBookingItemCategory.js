// 取得設計師預約項目類別
const api = (request) => (merchantId) => {
  const variables = { merchantId };
  const query = `
  query($merchantId: ID!) {
    getNDBookingItemCategory(merchantId: $merchantId) {
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
    data: { query, variables },
  });
};
export default api;
