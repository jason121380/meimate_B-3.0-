// 登入
const api = (request) => ({ ...OrdersInput }) => {
  const variables = { input: { ...OrdersInput } };
  const query = `
  query orders($input: OrdersInput!){
    orders(input:$input){
      orders{
        id
        no
        isDesignate
        status
        date
        endDate
        serviceFakeTotal
        productFakeTotal
        ticketFakeTotal
        ticketSellIntoPerformance
        ticketSellNotIntoPerformance
        useTicketTotal
        membershipFakeTotal
        businessCash
        remarkForCustomer
        customer{
          id
          name
          nickName
        }
        designer{
          id
          name
        }
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
