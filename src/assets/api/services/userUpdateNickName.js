// 設計師編輯暱稱
const api = (request) => (input) => {
  const variables = input;
  const query = `
  mutation userUpdateNickName($nickName: String){
    userUpdateNickName(nickName:$nickName)
  }
            `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
