// 設計師業績分析表
const api = (request) => (input) => {
  const variables = { ...input };
  const query = `
    query designerPerforamnceAnalyzeReport(
        $input : DateTimeInput!
        $displayReference:DisplayReferenceEnum 
        $designerIds:[ID]
      ){
        designerPerforamnceAnalyzeReport(
          input:$input
         displayReference:$displayReference
         designerIds:$designerIds
        ){
          designerName
          totalPerformance
          totalOrderCount
          orderAveragePrice
          orderDesignateCount
          orderDesignatePercentage
          orderNonDesignateCount
          orderNonDesignatePercentage
          productPerformance
          productPerformancePercentage
          membershipPerformance
          membershipPerformancePercentage
          serviceTypeAnalyze{
            typeName
            orderTypeCount
            orderTypePercentage
            orderTypeDesignateCount
            orderTypeDesignatePercentage
            orderTypeNonDesignateCount
            orderTypeNonDesignatePercentage
            currentOrderTypePerformance
            currentOrderTypePerformancePercentage
            currentOrderTypeAveragePrice
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
