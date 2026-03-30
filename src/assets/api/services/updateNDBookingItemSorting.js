// 新增設計師預約項目排序
const api = (request) => (input) => {
  const variables = input;
  const query = `
    mutation updateNDBookingItemSorting($input: [ID]!){
        updateNDBookingItemSorting(input:$input)
      }
          `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
