// 設計師編輯性別
const api = (request) => (input) => {
  const variables = input;
  const query = `
  mutation userUpdateGender($gender: GenderEnum!){
    userUpdateGender(gender:$gender)
  }
            `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
