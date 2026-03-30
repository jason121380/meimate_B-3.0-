// 新增設計師預約項目
const api = (request) => (input) => {
  const variables = input;
  const query = `
    mutation createBookingItem($input:CreateBookingItemInput!){
        createBookingItem (input:$input)
      }
        `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
