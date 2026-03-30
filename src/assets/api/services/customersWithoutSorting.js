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

const api = (request) => ({ ...CustomersWithoutSortingInput }) => {
  const variables = { input: { ...CustomersWithoutSortingInput } };
  const query = `
  query customersWithoutSorting($input:CustomersWithoutSortingInput!){
    customersWithoutSorting(input:$input) {
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
        isUnwelcome
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
