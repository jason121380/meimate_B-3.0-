// 登入
const api = (request) => (GetUserHelperRetrieveInput) => {
  const variables = { input: { ...GetUserHelperRetrieveInput } };
  const query = `
  query getUserHelperRetrieve($input: GetUserHelperRetrieveInput!){
    getUserHelperRetrieve(input:$input) {
      summary
      pointSummary 
      summaryOnlyPoint
      summaryNoPoint
      productPerformanceSummary
      productRakeSummary
      helperRecord {
        orderNo
        service {
          name
        }
        designer {
          name
        }
        helperMoneyGivenWay
        helperFee
        helperPoint
        helperFeeOnlyPoint
        helperFeeNoPoint
        
      }
      productRecord {
        orderNo
        productName
        productUnitPrice
        productCount
        productUnitPrice
        productCount
      }
    }
  }
  `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
