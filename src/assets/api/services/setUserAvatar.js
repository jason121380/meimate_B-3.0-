// 設定使用者大頭貼
const api = (request) => (file, isGlobal) => {
  const formData = new FormData();
  const operations = `{ "query": "mutation setUserAvatar($file: Upload! $isGlobal:Boolean ) {  setUserAvatar(file:$file ,isGlobal:$isGlobal)}","variables": { "file": null ,"isGlobal":${isGlobal}}}
  `;
  formData.append('operations', operations);
  formData.append('map', '{ "0": ["variables.file"]}');
  formData.append('0', file);

  return request({
    method: 'post',
    data: formData,
  });
};

export default api;
