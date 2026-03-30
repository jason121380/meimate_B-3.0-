const api = (request) => ({ ...GPSLocationInput }) => {
  const variables = { input: { ...GPSLocationInput } };
  const query = `
  query checkGPSStatus($input:GPSLocationInput!){
    checkGPSStatus(input:$input){
      status
      distance
    }
  }
  `;
  return request({
    method: 'post',
    data: { query, variables },
  });
};
export default api;
