// 更新預約內容
const api = (request) => (updateBooking, isCellphone) => {
  const variables = {
    input: updateBooking,
    isCellphone,
  };
  const query = `
  mutation updateBooking($input: BookingUpdateInput!, $isCellphone: Boolean){
      updateBooking(input: $input, isCellphone: $isCellphone){
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
