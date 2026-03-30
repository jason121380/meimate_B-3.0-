// 登入
const api = (request) => ({ keyword }) => {
  const variables = { input: { keyword } };
  const query = `
  query services($input: ServicesInput !){
    services(input:$input){
     data {
      name
      id
     }
    }
  }`;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
