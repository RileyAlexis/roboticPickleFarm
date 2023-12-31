//This file contains various utility functions that are called throughout the application

//Formats numbers based on the number of digits (thousand, million, billion) and adds commas for readabillity
export function formatNumber(number) {
  if (countDigits(number) >= 13) { return formatToTrillion(number, countDigits(number))
  } else if (countDigits(number) >= 10 && countDigits(number) <  13){ return formatToBillion(number, countDigits(number));
  } else if (countDigits(number) >= 7 && countDigits(number) < 10) {return formatToMillion(number, countDigits(number));
  } else if (countDigits(number) >= 5 && countDigits(number) < 7) {return formatToThousand(number, countDigits(number));
  } else return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function formatToTrillion(number, digits) {
    let firstSet;
    let secondSet;
    switch (digits) {
      case 13: firstSet = 1; secondSet = [1, 6]; break;
      case 14: firstSet = 2; secondSet = [2, 6]; break;
      case 15: firstSet = 3; secondSet = [3, 8]; break;
    }
    let firstThree = number.toString().slice(0,firstSet);
    let nextTwo = number.toString().slice(secondSet[0], secondSet[1]);
    return `${firstThree}.${nextTwo} T`; 
  }


function formatToBillion(number, digits) {
  let firstSet;
  let secondSet;
  switch (digits) {
    case 10: firstSet = 1; secondSet = [1, 3]; break;
    case 11: firstSet = 2; secondSet = [2, 4]; break;
    case 12: firstSet = 3; secondSet = [3, 5]; break;
  }
  let firstThree = number.toString().slice(0,firstSet);
  let nextTwo = number.toString().slice(secondSet[0], secondSet[1]);
  return `${firstThree}.${nextTwo} B`; 
}

function formatToMillion(number, digits) {
  let firstSet;
  let secondSet;
  switch (digits) {
    case 7: firstSet = 1; secondSet = [1, 3]; break;
    case 8: firstSet = 2; secondSet = [2, 4]; break;
    case 9: firstSet = 3; secondSet = [3, 5]; break;
  }
  let firstThree = number.toString().slice(0,firstSet);
  let nextTwo = number.toString().slice(secondSet[0], secondSet[1]);
  return `${firstThree}.${nextTwo} M`; 
}

function formatToThousand(number, digits) {
  let firstSet;
  let secondSet;
  switch (digits) {
    case 5: firstSet = 2; secondSet = [2, 4]; break;
    case 6: firstSet = 3; secondSet = [3, 5]; break;
  }
  let firstThree = number.toString().slice(0,firstSet);
  let nextTwo = number.toString().slice(secondSet[0], secondSet[1]);
  return `${firstThree}.${nextTwo} K`; 
}

  //No longer used
  export function countPlants(plants) {
    return plants.reduce((sum, obj) => {
      if (obj.hasOwnProperty('modifier') && typeof obj['modifier'] === 'number') {
        return sum + obj['modifier'];
      } else {
        return sum;
      }
    }, 0);
  }

  //Counts the number of digits in a number
export function countDigits(number) {

  let decimalIndex = number.toString().indexOf('.');
  if (decimalIndex === -1) {
  return number.toString().length;
  } else return decimalIndex;
}
  
  //Calculates the current trend based on the trend interval (set in the "settings" menu)
  //The trends are calculated live in the component, not as part of the ticker update cycle
  export const calculateTrend = (array, timeframe) => {

    let newArr = array.slice(timeframe);
    let diff = newArr[newArr.length-1] - newArr[0];
    let sign = '';
    if (diff > 0) sign = '+';
    else if (diff < 0) sign ='-';
    else sign = '';
    if (isNaN(diff)) { return { sign: '', trend: 0 }
    } else {
    return {sign: sign, trend: (Math.abs(parseFloat(diff / newArr.length)).toFixed(2)) };
    }
}
  
//No longer used
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

//counts the number of zeroes after a decimal.
//Used to show the percentage progress toward the total goal
//Prevents the game from continuing to show long decimal numbers when they are no longer relevant
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

//Used for the overall progress percentage
export function calculatePercentage(progress, goal) {
  const complete = (progress / goal);
  const lowValue = 0.000001;
  const decs = countZerosAfterDecimal(complete);
  if (lowValue >= complete) {
    return parseFloat(complete).toFixed(Number(decs) + 8);
  } else {
  return parseFloat(complete * 100).toFixed(Number(decs) + 3);
  }
  }
