// 設定顧客是否為黑名單
const api = (request) => ({ id, isUnwelcome }) => {
  const variables = { customerId: id, input: isUnwelcome };
  const query = `
  mutation setCustomerIsUnwelcome($customerId: ID!, $input: Boolean!){
    setCustomerIsUnwelcome(customerId: $customerId, input:$input)
  }
  `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
