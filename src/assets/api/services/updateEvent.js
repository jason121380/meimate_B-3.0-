// 新增行事曆預約「事件」
const api = (request) => (input) => {
  const variables = input;
  const query = `
    mutation UpdateEvent($input: UpdateEventInput!) {
      updateEvent(input: $input)
    }
  `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
