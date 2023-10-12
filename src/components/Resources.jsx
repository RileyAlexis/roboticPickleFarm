import { useSelector } from "react-redux";

import RobotData from "./RobotData";

function Resources () {

    const resources = useSelector(store => store.resources);
    const plants = useSelector(store => store.plants);
    const ripeCucumbers = useSelector(store => store.stats.ripeCucumbers);
    const maxYield = useSelector(store => store.stats.maxYield);
    const totalGrowthRate = useSelector(store => store.stats.totalGrowthRate)
    const averageAge = useSelector(store => store.stats.averageAge);
    const stats = useSelector(store => store.stats);

    const calculateTrend = (array) => {
        const limitedArray = array.slice(-200);
        const trends = [];
      
        for (let i = 1; i < limitedArray.length; i++) {
          const difference = limitedArray[i] - limitedArray[i - 1];
          if (difference > 0) {
            trends.push('+'); // Positive trend
          } else if (difference < 0) {
            trends.push('-'); // Negative trend
          } else {
            trends.push('0'); // No change
          }
        }
      
        const totalTrends = trends.length;
        const positiveTrends = trends.filter(trend => trend === '+').length;
        const negativeTrends = trends.filter(trend => trend === '-').length;
        const averageTrend = totalTrends > 0 ? ((positiveTrends - negativeTrends) / totalTrends).toFixed(2) : 0;
      
        return averageTrend;
      };


    return (
        <>
        <h4>Total Production: {stats.totalProduction}</h4>
        <h3>Resources:</h3>
        <p>Seeds: {resources.seeds[resources.seeds.length-1]}</p>
        <p>Cucumbers: {resources.cucumbers[resources.cucumbers.length-1]} ( {calculateTrend(resources.cucumbers)}/s )</p>
        <p>Pickles: {resources.pickles[resources.pickles.length-1]}  ( {calculateTrend(resources.pickles)}/s )</p>
        <h3>Plants: {plants.length * plants[0]?.modifier }</h3>
        <p>Growth Rate: {totalGrowthRate} / s</p>
        <p>Max Yield: {maxYield}</p>
        <p>Average Age: {averageAge}</p>
        <p>Ripe Cucumbers: {ripeCucumbers}</p>
        <RobotData />
        </>
    )
}

export default Resources;