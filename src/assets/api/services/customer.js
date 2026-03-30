// 登入
const api = (request) => ({ id }) => {
  const variables = { id };
  const query = `
  query customer($id:ID){
    customer(id:$id){
      id
      name
      cellphone
      nickName
      email
      lineId
      address
      source
      gender
      birthday {
        year
        month
        day
      }
      isUnwelcome
    }
  }
  `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
