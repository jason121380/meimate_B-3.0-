// 新增設計師預約項目類別
const api = (request) => (input) => {
  const variables = input;
  const query = `
    mutation updateBookingItemCategory($input: [UpdateBookingItemCategoryInput]! ){
        updateBookingItemCategory(input: $input)
    }
      `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
