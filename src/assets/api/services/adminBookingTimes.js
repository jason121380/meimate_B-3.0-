// 申請排休
const api = (request) => ({ ...AdminBookingTimesInput }) => {
  const variables = { input: { ...AdminBookingTimesInput } };
  const query = `
    mutation AdminBookingTimes($input: AdminBookingTimesInput) {
      adminBookingTimes(input: $input)
    }
  `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
