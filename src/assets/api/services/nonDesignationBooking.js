// 不指定預約
const api = (request) => ({ ...NonDesignationBookingInput }) => {
  const variables = { input: { ...NonDesignationBookingInput } };
  const query = `
  mutation nonDesignationBooking($input:NonDesignationBookingInput!){
    nonDesignationBooking(input:$input) {
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
