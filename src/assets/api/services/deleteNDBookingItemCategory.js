// 刪除設計師預約項目類別
const api = (request) => (bookingItemCategoryId) => {
  const variables = bookingItemCategoryId;
  const query = `
    mutation deleteNDBookingItemCategory($bookingItemCategoryId: [ID]!){
        deleteNDBookingItemCategory (bookingItemCategoryId:$bookingItemCategoryId)
      }
      
      `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
