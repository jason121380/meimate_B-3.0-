// 固定公休清單
const api = (request) => ({ ...SetRegularHolidayInput }) => {
  const variables = { input: { ...SetRegularHolidayInput } };
  const query = `
  mutation setRegularHoliday($input:SetRegularHolidayInput!){
    setRegularHoliday(input:$input)
  }
  `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
