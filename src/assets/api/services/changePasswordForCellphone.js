// 設計師更改密碼
const api = (request) => (input) => {
  const variables = input;
  const query = `
  mutation changePasswordForCellphone($input: UserUpdatePasswordInput!){
    changePasswordForCellphone(input:$input)
  }
            `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
