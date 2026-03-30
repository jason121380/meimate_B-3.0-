// 設計師編輯名字
const api = (request) => (input) => {
  const variables = input;
  const query = `
  mutation userUpdateFirstName($firstName: String){
    userUpdateFirstName(firstName:$firstName)
  }
            `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
