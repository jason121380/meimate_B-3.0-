// 新增設計師預約項目
const api = (request) => (input) => {
  const variables = input;
  const query = `
    mutation createNDBookingItem($input:CreateBookingItemInput!){
        createNDBookingItem (input:$input)
      }
        `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
