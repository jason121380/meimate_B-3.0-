// 申請排休
const api = (request) => ({ ...AdminBookingTimeInput }) => {
  const variables = { input: { ...AdminBookingTimeInput } };
  const query = `
  mutation adminBookingTime($input: AdminBookingTimeInput! ){
    adminBookingTime(input: $input){
      designerId
      storeId
      status
      time
    }
  }
  `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
