// 查詢全店設計師
const api = (request) => ({ id, usagelimit }) => {
  const variables = { input: { id, usagelimit } };
  const query = `
    query users($input:UsersInput!){
      users(input:$input){
        users{
          id
          name
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
