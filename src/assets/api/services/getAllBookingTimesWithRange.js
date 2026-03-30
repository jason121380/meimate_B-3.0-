const api = (request) => ({ ...GetAllBookingTimesWithRangeInput }) => {
  const variables = { input: { ...GetAllBookingTimesWithRangeInput } };
  const query = `
  query getAllBookingTimesWithRange($input:GetAllBookingTimesWithRangeInput!){
    getAllBookingTimesWithRange(input:$input) {
      designer{
        name
        id
      }
      schedule{
        date
        isRegularHoliday
        bookingTimes{
          time
          status
          statusComment
          isRegularHoliday
          orders {
            id
            date
            isDesignate
            customer {
              id
              name
            }
            designer {
              id
              name
            }
          }
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
