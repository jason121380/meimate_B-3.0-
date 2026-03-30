const api = (request) => ({ ...GetDesignerBookingTimesWithRangeInput }) => {
  const variables = { input: { ...GetDesignerBookingTimesWithRangeInput } };
  const query = `
  query getDesignerBookingTimesWithRange($input:GetDesignerBookingTimesWithRangeInput!){
    getDesignerBookingTimesWithRange(input:$input) {
      date
      isRegularHoliday
      bookingTimes{
        time
        status
        statusComment
        isRegularHoliday
        events{
          id
          date
          text
          isDone
        }
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
  `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
