// 刪除行事曆預約「事件」
const api = (request) => (input) => {
  const variables = input;
  const query = `
    query GetEvent($getEventId: ID!) {
      getEvent(id: $getEventId) {
        eventId
        timeCost
        dates
        text
        isHolidaySync
      }
    }`;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
