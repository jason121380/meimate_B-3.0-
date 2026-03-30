// 設計師綁定line ID
const api = (request) => (input) => {
  const variables = input;
  const query = `
    mutation userBindWithLine($code:String!){
        userBindWithLine(code:$code)
      }
            `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
