// 取得是否可檢視所有客戶資料
const api = (request) => () => {
  const variables = {};
  const query = `
  query{
    isAllCusDisplay
  }
  `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
