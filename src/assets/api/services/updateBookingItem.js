// 更新設計師預約項目
const api = (request) => (bookingItemCategoryId) => {
  const variables = bookingItemCategoryId;
  const query = `
    mutation updateBookingItem($input: [UpdateBookingItemInput]!) {
        updateBookingItem(input: $input)
      }
        `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
