// 更新設計師預約項目
const api = (request) => (bookingItemCategoryId) => {
  const variables = bookingItemCategoryId;
  const query = `
    mutation updateNDBookingItem($input: [UpdateBookingItemInput]!) {
        updateNDBookingItem(input: $input)
      }
        `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
