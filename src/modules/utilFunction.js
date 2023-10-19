export function formatNumber(number) {
    // Convert the number to a string and use regex to add commas
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  export function countPlants(plants) {
    return plants.reduce((sum, obj) => {
      if (obj.hasOwnProperty('modifier') && typeof obj['modifier'] === 'number') {
        return sum + obj['modifier'];
      } else {
        return sum;
      }
    }, 0);
  }

  
  export const calculateTrend = (array) => {
    let newArr = array.slice(-60);
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