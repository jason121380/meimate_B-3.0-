//
const api = (request) => ({ ...getBookingTimes }) => {
  const variables = { input: { ...getBookingTimes } };
  const query = `
  query getBookingTimes($input:GetBookingTimesInput!){
    getBookingTimes(input:$input){
      time
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
