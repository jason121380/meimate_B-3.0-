// 申請排休
const api = (request) => ({ ...AdminBookingTimeInput }) => {
  const variables = { input: { ...AdminBookingTimeInput } };
  const query = `
  mutation adminBookingTimeWholeDay($input: AdminBookingTimeInput! ){
    adminBookingTimeWholeDay(input: $input){
      designerId
      storeId
      status
      time
      isHoliday
    }
  }
  `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
