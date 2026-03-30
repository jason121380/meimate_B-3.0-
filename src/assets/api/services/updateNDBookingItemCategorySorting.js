// 新增設計師預約項目類別排序
const api = (request) => (input) => {
  const variables = input;
  const query = `
  mutation updateNDBookingItemCategorySorting($input: [ID]!){
    updateNDBookingItemCategorySorting(input:$input)
  }
          `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
