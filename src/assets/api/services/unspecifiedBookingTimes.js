//
const api = (request) => ({ ...UnspecifiedBookingTimesInput }) => {
  const variables = { input: { ...UnspecifiedBookingTimesInput } };
  const query = `
  query unspecifiedBookingTimes($input: UnspecifiedBookingTimesInput!){
    unspecifiedBookingTimes(input:$input) {
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
