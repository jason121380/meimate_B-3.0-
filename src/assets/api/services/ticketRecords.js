// 登入
const api = (request) => ({ keyword, isUseTicket = false }) => {
  const variables = { keyword, isUseTicket };
  const query = `
  query ticketRecords($input:TicketRecordInput!){
    ticketRecords(input: $input){
      pageLimit
      pageOffset
      totalCount
    }
  }
  `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
