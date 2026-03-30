// 查詢客戶剩餘入金
const api = (request) => (userInput) => {
  const variables = {};
  const query = `
    query {
      customerWallet(customerId: "${userInput.customerId}")
    }
  `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
