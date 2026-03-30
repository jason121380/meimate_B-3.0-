// 登入
const api = (request) => ({ date, designerIds }) => {
  const variables = { date, designerIds };
  const query = `
  query designerDailyReport($date:DateTime!,$designerIds:[ID]){
    designerDailyReport(date:$date,designerIds:$designerIds) {
        user {
          id
            name
            nickName
            designerNo
        }
        orderRecord {
            orderId
            designation
            orderNo
            category
            itemName
            fakePerformance
            truthPerformance
            truthPerformanceWithHelperUsage
        }
        currentDay{
            performanceFakeTotal
            performanceTruthTotal
            performanceDesignateTruthTotal
            performanceNonDesignateTruthTotal
            performanceWithSpecialRake
            orderTotalCount
            designateOrderCount
            nonDesignateOrderCount
            productFakeTotal
            productRake
            customerAveragePrice
            orderAveragePrice
            helperRetrievePoint
            helperRetrievePrice
            helperPaidPoint
            walletDeposit
            orderTypeCount
            orderTypeAveragePrice
            customerDesignateCount
            customerNonDesignateCount
            customerTotalCount
            thirdPartHandlingFee
            deductionItem
            helperPaidPrice
            helperPaidPriceFromPoint
            helpGetNoPoint
        }
        tillNow {
            performanceFakeTotal
            performanceTruthTotal
            performanceDesignateTruthTotal
            performanceNonDesignateTruthTotal
            performanceWithSpecialRake
            orderTotalCount
            designateOrderCount
            nonDesignateOrderCount
            productFakeTotal
            productRake
            customerAveragePrice
            orderAveragePrice
            helperRetrievePoint
            helperRetrievePrice
            helperPaidPoint
            walletDeposit
            orderTypeCount
            orderTypeAveragePrice
            customerDesignateCount
            customerNonDesignateCount
            customerTotalCount
            thirdPartHandlingFee
            deductionItem
            helperPaidPrice
            helperPaidPriceFromPoint
            helpGetNoPoint
        },
        currentTruthSummary
        currentFakeSummary
        isLastPage
        totalPageCount
        currentPageOrder
    }
  }
  `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
