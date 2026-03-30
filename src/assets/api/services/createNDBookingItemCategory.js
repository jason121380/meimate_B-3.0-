// 新增設計師預約項目類別
const api = (request) => (name) => {
  const variables = name;
  const query = `
    mutation createNDBookingItemCategory($name:String!){
        createNDBookingItemCategory (name:$name)
      }
    `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
