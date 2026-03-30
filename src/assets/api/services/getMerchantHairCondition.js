// 取得店家髮況選項
const api = (request) => () => {
  const variables = {};
  const query = `
  query GetMerchantHairCondition {
    getMerchantHairCondition {
      hairProperties
      scalpProperties
      permAppliance
      permPotion
      hairColorCategory
      hairColor
    }
  }
  `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
