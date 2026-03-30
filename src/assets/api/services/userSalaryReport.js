// 薪資條
const api = (request) => (input) => {
  const variables = input;
  const query = `
    query userSalaryReport(
        $date:DateTime
        $isCellphone:Boolean 
      ){
        userSalaryReport(
          date:$date
          isCellphone:$isCellphone
        ){
          name
          increaseItem{
            itemName
            price
            type
          }
          decreaseItem{
            itemName
            price
            type
          }
          summary
          helperPointRetrieve
          designateTruthPerformance
          nonDesignateTruthPerformance
          specialTruthPerformance
          truthPerformance
          remark
        }
      }
    `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
