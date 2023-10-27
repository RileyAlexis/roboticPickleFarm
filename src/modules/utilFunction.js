export function formatNumber(number) {
    // Convert the number to a string and use regex to add commas
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
  }
  
  export const calculateTrend = (array, timeframe) => {

    let newArr = array.slice(timeframe);
    let diff = newArr[newArr.length-1] - newArr[0];
    let sign = '';
    if (diff > 0) sign = '+';
    else if (diff < 0) sign ='-';
    else sign = '';
    return {sign: sign, trend: (Math.abs(parseFloat(diff / newArr.length)).toFixed(2)) };
}
  
  export function averageProperty(objectsArray, propertyName) {
    if (!Array.isArray(objectsArray) || objectsArray.length === 0) {
        return 0;
    }

    if (typeof propertyName !== 'string') {
        throw new Error('Property name should be a string');
    }

    const validObjects = objectsArray.filter(obj => obj.hasOwnProperty(propertyName) && typeof obj[propertyName] === 'number');

    if (validObjects.length === 0) {
        return 0;
    }

    const sum = validObjects.reduce((acc, obj) => acc + obj[propertyName], 0);
    const average = sum / validObjects.length;
    return average;
}

function countZerosAfterDecimal(number) {
  // Convert the number to a string to handle decimal points
  const numString = number.toString();

  // Check if the number has a decimal point
  if (numString.includes('.')) {
      // Split the number by the decimal point
      const decimalPart = numString.split('.')[1];
      
      // Count the number of zeros after the decimal point
      let count = 0;
      for (let i = 0; i < decimalPart.length; i++) {
          if (decimalPart[i] === '0') {
              count++;
          } else {
              // Break the loop if a non-zero digit is encountered
              break;
          }
      }
      return count;
  } else {
      // If the number doesn't have a decimal point, return 0
      return 0;
  }
}

export function calculatePercentage(progress, goal) {
  const complete = (progress / goal);
  const lowValue = 0.000001;
  const decs = countZerosAfterDecimal(complete);
  if (lowValue >= complete) {
    return parseFloat(complete).toFixed(Number(decs) + 8);
  } else {
  return parseFloat(complete).toFixed(Number(decs) + 3)
  }
  }
