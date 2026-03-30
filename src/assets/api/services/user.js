// 查詢個人資訊
const api = (request) => ({ id }) => {
  const variables = { input: { id } };
  const query = `
    query user($input: UserInput){
      user(input:$input){
        avatar
        isLineBinded
        firstName
        lastName
        nickName
        gender
        birthday
        merchants {
          id
          name
          openingHours
          closingHours
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
