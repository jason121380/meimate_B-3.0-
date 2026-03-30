// 是否接受預約
const api = (request) => ({ orderId, isApproval }) => {
  const variables = { input: { orderId, isApproval } };
  const query = `
  mutation verifyBooking($input:VerifyBookingInput!) {
    verifyBooking(input: $input){
      id
      date
      remark
      status
      customer{
        id
        name
        cellphone
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
    }
  }
  `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
