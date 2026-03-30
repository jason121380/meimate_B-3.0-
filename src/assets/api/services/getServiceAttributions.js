// 獲取歸屬
const api = (request) => () => {
  const variables = {};
  const query = `
  query{
    serviceAttributions
  }
  `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
