// 指定預約
const api = (request) => (customerIdInput) => {
  const variables = {};
  const query = `
  query {
    customerCouponBalanceReport(input: {
      customerId: "${customerIdInput}"
    }) {
      data{
        couponId
        couponNo
        singleCouponPrice
        couponName
        totalCount
        usedCount
        remainingCount
        boughtDate
        ticketOrderId
        usageRecord{
          usedDate
          usageCount
        }
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
