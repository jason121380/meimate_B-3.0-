// 刪除設計師預約項目
const api = (request) => (bookingItemCategoryId) => {
  const variables = bookingItemCategoryId;
  const query = `
    mutation deleteBookingItem($bookingItemId: [Int]!){
        deleteBookingItem(bookingItemId:$bookingItemId)
      }
        `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
