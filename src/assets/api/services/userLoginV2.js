// 登入
const api = (request) => ({ ...UserLoginInput }) => {
  const variables = { input: { ...UserLoginInput } };
  const query = `
  mutation UserLoginV2($input: UserLoginInput!){
    userLoginV2(input:$input){
      user{
        name
        id
        isLineBinded
        merchants{
          id
          name
        }
      }
      token
      officialBrandMerchantId
      officialBrandMerchantName
    }
  }
  `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
