export const isJSON = (str) => {
  let result = false;
  try {
    let obj = JSON.parse(str);
    result = true;
  } catch (e) {
    result = false;
  }
  return result;
}
