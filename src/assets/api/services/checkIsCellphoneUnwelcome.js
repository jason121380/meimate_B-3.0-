// 查詢門號是否為黑名單
const api = (request) => ({ cellphone }) => {
  const variables = { cellphone };
  const query = `
    query checkIsCellphoneUnwelcome($cellphone: String!){
      checkIsCellphoneUnwelcome(cellphone:$cellphone)
    }
  `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
