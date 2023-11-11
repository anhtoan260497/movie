export const limitItems = (itemsArr, quantity = 1) => {
  return itemsArr.filter((item, idx) => quantity > idx);
};
// return list items limit with quantity
// itemsArr : [items]
// quantity : number

export const decimalPlace = (number, numberOfDecimal) => {
  return parseFloat(number.toFixed(numberOfDecimal));
};  
// return number with decimal with numberOfDecimal
// number : number as float
// numberOfDecimal : number


