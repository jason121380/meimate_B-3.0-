// 驗證此電話是否有客資
const api = (request) => (input) => {
  const variables = input;
  const query = `
    query checkIsCustomerExist($cellphone: String!){
        checkIsCustomerExist(cellphone: $cellphone) {
            isExist
            customerName
        }
      }
            `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
