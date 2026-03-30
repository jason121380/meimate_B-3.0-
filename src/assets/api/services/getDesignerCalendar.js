// 新版行事曆API
const api = (request) => (data) => {
  // {
  //   "dateRange": {
  //     "startDate": 1679587200000,
  //     "endDate": 1679673599000
  //   },
  //   "isDADC": true
  // }
  const variables = { input: { ...data } };
  const query = `
  query getDesignerCalendar ($input:DesignerCalendarInput!){
    getDesignerCalendar(input:$input) {
      type
      startTime
      endTime
      timeCost
      ids
      nameToDisplay
      isDesignate
      isCusCheckRequired
      designerId
      designerName
      nameToDisplayForList
      isDone
      remarkForCustomer
    }
  }
  `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
