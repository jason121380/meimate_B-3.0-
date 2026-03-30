// 新增行事曆預約「事件」
const api = (request) => (input) => {
  const variables = input;
  const query = `
    mutation createEvent($input: CreateEventInput!){
        createEvent(input:$input)
      }
        `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
