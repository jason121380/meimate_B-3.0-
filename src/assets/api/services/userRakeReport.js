// 登入
const api = (request) => ({ date, designerIds }) => {
  const variables = { input: date, designerIds };
  const query = `
  query userRakeReport($input: UserRakeReportDateTimeInput!, $designerIds:[ID]){
    userRakeReport(input: $input,designerIds:$designerIds) {
      user {
        name
      }
      salesAnalytics{
        servicePerformanceFakeTotal
        serviceThirdPartHandlingFeeOnSales
        servicePerformanceDecountItem
        truthPerformanceWithoutHelper
        servicePerformanceDesignateTruthTotalBeforeHelperDecount
        servicePerformanceNonDesignateTruthTotalBeforeHelperDecount
        servicePerformanceDecountHelperUsagePrice
        servicePerformanceTruthTotal
        servicePerformanceDesignateTruthTotal
        servicePerformanceNonDesignateTruthTotal
        servicePerformanceRake
        servicePerformanceDesignateRake
        servicePerformanceNonDesignateRake
        specialRake
        serviceThirdPartHandlingFeeOnSalary
        serviceSalaryDecountItem
        serviceSalaryDecountHelperUsagePrice
        serviceSalaryShouldBePaid
        productPerformanceFakeTotal
        productThirdPartHandlingFeeOnSales
        productPerformanceTruthTotal
        productRakeByCost
        productRakeByFixed
        productRakeByPrice
        productThirdPartHandlingFeeOnSalary
        helperRetrievePriceNoPoint
        helperRetrievePoint
        helperRetrievePriceOnlyPoint
        helperPointPaid
        helperPricePaid
        walletDepositHandlingFeeByDesigner
        totalSalaryShouldBePaid
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
