// 取得權限
const api = (request) => () => {
  const variables = {};
  const query = `
  query{
    getMerchantAuthorities {
      id
      authorityName
      authoritySettings
      isDefault
      usingDesignerCount
    }
  }
  `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
