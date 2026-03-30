// 入金紀錄
const api = (request) => ({ ...walletDepositRecordInput }) => {
  const variables = { input: { ...walletDepositRecordInput } };
  const query = `
  query walletDepositRecord($input:WalletRecordInput!){
    walletDepositRecord(input:$input) {
      pageLimit
      pageOffset
      totalCount
      record{
        id
        date
        money
        payType
        Maker{
          name
        }
        handlingFeeDecountPrice
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
