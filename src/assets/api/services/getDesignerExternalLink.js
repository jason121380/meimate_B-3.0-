const api = (request) => () => {
  const variables = { input: {} };
  const query = `
    query GetDesignerExternalLink {
      getDesignerExternalLink {
        id
        name
        url
      }
    }
  `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
