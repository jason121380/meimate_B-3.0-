const api = (request) => (storeId) => {
  const variables = { storeId };
  const query = `
    query GetLineBindLinkForDesigner($storeId: ID!) {
      getLineBindLinkForDesigner(storeId: $storeId)
    }
  `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
