// 設計師編輯姓
const api = (request) => (input) => {
  const variables = input;
  const query = `
  mutation userUpdateLastName($lastName: String){
    userUpdateLastName(lastName:$lastName)
  }
            `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
