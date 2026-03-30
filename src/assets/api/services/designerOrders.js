// 登入
const api = (request) => ({ ...OrdersInput }) => {
  const variables = { input: { ...OrdersInput } };
  const query = `
  query orders($input: OrdersInput!){
    orders(input:$input){
      orders{
        id
        no
        date
        serviceFakeTotal
        productFakeTotal
        useTicketTotal
        ticketSellIntoPerformance
        performanceIncome
        ticketSellNotIntoPerformance
        usedTicketForDecount
        thirdPartTicketForDecount
        otherPayWayForDecount
        walletUsedForDecount
        businessCash
        customer {
          name
        }
        designer {
          nameForCustomerSide
        }
        staticDetail{
          designerName
          itemName
          price
          count
          helperList{
            helperName
            helperNo
            helperType
          }
        }
      }
      intervalSummary{
        service
        product
        usedTicket
        ticketSellIntoPerformance
        performanceIncome
        ticketSellNotIntoPerformance
        usedTicketForDecount
        thirdPartTicketForDecount
        otherPayWayForDecount
        walletUsedForDecount
        walletDeposit
        businessCash
      }
      pageLimit
      pageOffset
      totalCount
    }
  }`;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
