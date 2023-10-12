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
        const limitedArray = array.slice(-1000);
        let totals = 0;
        for (let i = 0; i < limitedArray.length; i++) {
            totals += limitedArray[i];
        }
        let average = totals / limitedArray.length;
        if (average > 0) return `+${parseFloat(average.toFixed(2))}`;
        else return parseFloat(average.toFixed(2));
        
      };


    return (
        <>
        <h4>Total Production: {stats.totalProduction}</h4>
        <h3>Resources:</h3>
        <p>Seeds: {resources.seeds}</p>
        <p>Cucumbers: {resources.cucumbers} ( {calculateTrend(stats.cucumberProduction)}/s )</p>
        <p>Pickles: {resources.pickles}  ( {calculateTrend(stats.pickleProduction)}/s )</p>
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