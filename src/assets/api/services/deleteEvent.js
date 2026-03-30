// 刪除行事曆預約「事件」
const api = (request) => (input) => {
  const variables = input;
  const query = `
  mutation deleteEvent($eventId: ID!, $isHolidaySync: Boolean){
    deleteEvent(eventId:$eventId, isHolidaySync: $isHolidaySync)
  }
        `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
