// 登入
const api = (request) => ({ ...walletDepositRecordInput }) => {
  const variables = { input: { ...walletDepositRecordInput } };
  const query = `
  query walletUseRecord($input:WalletRecordInput!){
    walletUseRecord(input:$input){
      pageLimit
      pageOffset
      totalCount
      record{
        id
        orderNo
        order{
          id
          date
        }
        date
        money
        Designer{
          name
        }
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
