// 取得權限
const api = (request) => () => {
  const variables = {};
  const query = `
  query {
    me{
      isLineBinded
      firstName
      lastName
      nickName
      gender
      birthday
      merchantIdentity{
        authorityName
        authorityId
      }
    }
  }
  `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
