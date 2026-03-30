// 登入
const api = (request) => ({ orderId }) => {
  const variables = { orderId };
  const query = `
  query order($orderId:ID!){
    order(orderId:$orderId){
      id
      date
      remark
      status
      remarkForCustomer
      messageForCustomer
      isDesignate
      timeCost
      isBookingCostUsing
      isCusCheckRequired
      merchant{
        id
        name
      }
      customer{
        id
        name
        cellphone
        isUnwelcome
      }
      designer{
        id
        name
      }
      serviceOrders{
        id
        name
      }
      friends{
        customer{
          id
          name
          cellphone
        }
      }
      companionCount
    }
  }
  `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
