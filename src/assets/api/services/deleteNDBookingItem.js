// 刪除設計師預約項目
const api = (request) => (bookingItemCategoryId) => {
  const variables = bookingItemCategoryId;
  const query = `
    mutation deleteNDBookingItem($bookingItemId: [Int]!){
        deleteNDBookingItem(bookingItemId:$bookingItemId)
      }
        `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
