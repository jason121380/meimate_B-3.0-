// 員工QRCODE打卡
const api = (request) => (submitData) => {
  const variables = {
    input: submitData,
  };
  const query = `
    mutation UserQrcodeClockIn($input: UserQrcodeClockInInput!) {
      userQrcodeClockIn(input: $input) {
        status
        message
      }
    }
  `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
