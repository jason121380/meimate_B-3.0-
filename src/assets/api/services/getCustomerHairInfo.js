// 取得顧客髮況
const api = (request) => (customerId) => {
  const variables = {
    customerId,
  };
  const query = `
  query GetCustomerHairInfo($customerId: ID!) {
    getCustomerHairInfo(customerId: $customerId) {
      hairProperties
      scalpProperties
      permAppliance
      permPotion
      hairColorCategory
      hairColor
      hairDyeFormula
    }
  }
  `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
