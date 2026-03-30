// 設定顧客髮況
const api = (request) => (data) => {
  const variables = { input: data };
  const query = `
    mutation SetCustomerHairInfo($input: CustomerHairInfoInput!) {
      setCustomerHairInfo(input: $input)
    }
  `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
