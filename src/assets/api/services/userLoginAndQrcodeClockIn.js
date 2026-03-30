const api = (request) => (data) => {
  const variables = { input: data };
  const query = `
    mutation UserLoginAndQrcodeClockIn($input: UserLoginAndQrcodeClockInInput!) {
      userLoginAndQrcodeClockIn(input: $input) {
        message
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
