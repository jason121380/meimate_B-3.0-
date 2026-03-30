// 設計師店販抽成明細表，商品一覽
const api = (request) => (input) => {
  const variables = input;
  const query = `
  query products($input: ProductsInput!){
    products(input:$input){
      pageLimit
      pageOffset
      totalCount
      data{
        id
        name
        no
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
