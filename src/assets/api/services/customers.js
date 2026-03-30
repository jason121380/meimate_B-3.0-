// 客戶資料查詢
/**
 * {
 *  merchantId
 *  keyword
 *  birthday { // BirthdayInput
 *    year
 *    month
 *    day
 *  }
 * }
 */

const api = (request) => ({ ...CustomersInput }) => {
  const variables = { input: { ...CustomersInput } };
  const query = `
  query customers($input:CustomersInput!){
    customers(input:$input) {
      pageLimit
      pageOffset
      totalCount
      customers{
        id
        name
        birthday{
          year
          month
          day
        }
        cellphone
      }
    }
  }
  `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
