// 新增設計師預約項目排序
const api = (request) => (input) => {
  const variables = input;
  const query = `
    mutation updateBookingItemSorting($input: [ID]!){
        updateBookingItemSorting(input:$input)
      }
          `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
