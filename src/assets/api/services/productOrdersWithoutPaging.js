// 設計師店販抽成明細表清單
const api = (request) => (input) => {
  const variables = input;
  const query = `

  query productOrdersWithoutPaging($input: ProductOrdersWithoutPagingInput!) {
    productOrdersWithoutPaging(input:$input){
      orderDate
      orderNo
      customerName
      customerId
      productName
      productNo
      productId
      price
      count
      handlingFee
      commission
    }
  }
  `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
