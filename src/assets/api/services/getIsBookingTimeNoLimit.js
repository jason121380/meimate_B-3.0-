const api = (request) => () => {
  const variables = {};
  const query = `
  query GetParameterAboutSettingFunction {
    getParameterAboutSettingFunction {
      isBookingTimeNoLimit
    }
  }
  `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
