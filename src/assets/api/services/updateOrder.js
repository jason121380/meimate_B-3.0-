// 更新預約內容
const api = (request) => ({ ...BookingV2Input }) => {
  const variables = { input: { ...BookingV2Input } };
  const query = `
  mutation bookingV2($input: BookingV2Input! ){
    bookingV2(input: $input){
      id
      status
    }
  }
  `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
