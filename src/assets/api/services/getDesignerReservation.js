// 新版行事曆API
const api = (request) => (data) => {
  // {
  //   "dateRange": {
  //     "startDate": 1679587200000,
  //     "endDate": 1679673599000
  //   },
  //   "customerKeyword": "",
  //   "isEarlierRecordDisplay": false
  // }
  const variables = { input: { ...data } };
  const query = `
  query getDesignerReservation($input: DesignerReservationInput!) {
    getDesignerReservation(input:$input) {
      orderId
      isDesignate
      orderDate
      customerName
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
