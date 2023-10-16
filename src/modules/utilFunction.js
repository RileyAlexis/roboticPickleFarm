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