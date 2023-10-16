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
    let duration = 150;

    if (array.length < duration) {
      return 0;
    }

    const shortArray = array.slice(-duration);
    const differences = [];
    for (let i = 1; i <= duration; i++) {
      differences.push(array[i] - array[i - i]);
    }

    // Calculate the average change per second
    const totalChange = differences.reduce((acc, diff) => acc + diff, 0);
    const averageChangePerSecond = totalChange / duration;

    return parseFloat(averageChangePerSecond).toFixed(2);
  };