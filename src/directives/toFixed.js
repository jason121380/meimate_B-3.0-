/* eslint-disable */
const handleToFixed = (element) => {
  try {
    if (element.innerText && element.innerText == 0) return
    
    let text = (+element.innerText).toFixed(1)
    
    if (text.slice(-2) === '.0') {
      text = text.slice(0, -2)
    }
  
    element.innerText = text
  } catch (error) {
    console.error(error)
  }

}
export default handleToFixed;
