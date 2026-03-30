// 設計師互助日報表
const api = (request) => (input) => {
  const variables = input;
  const query = `
  query helperDailyReport($input:HelperDailyReportInput!){
    helperDailyReport(input:$input){
      user{
        nameForReport
      }
      helperRecord{
        orderNo
        itemName
        designer{
          nameForReport
        }
        price
        point
      }
      helperRecordPriceSummary
      helperRecordPointSummary
      summaryCurrentDay{
        priceRetrieveWithoutPoint
        priceRetrieveFromPoint
        point
        productPerformance
        productRake
        membershipPerformance
        membershipRake
      }
      summaryTillNow{
        priceRetrieveWithoutPoint
        priceRetrieveFromPoint
        point
        productPerformance
        productRake
        membershipPerformance
        membershipRake
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
