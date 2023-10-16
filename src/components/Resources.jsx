import { useSelector } from "react-redux";
import { Typography } from "@mui/material/styles/createTypography";

import RobotData from "./RobotData";
import { duration } from "@mui/material";
import { countPlants, formatNumber } from "../modules/utilFunction";

function Resources() {

  const resources = useSelector(store => store.resources);
  const plants = useSelector(store => store.plants);
  const ripeCucumbers = useSelector(store => store.stats.ripeCucumbers);
  const maxYield = useSelector(store => store.stats.maxYield);
  const totalGrowthRate = useSelector(store => store.stats.totalGrowthRate)
  const averageAge = useSelector(store => store.stats.averageAge);
  const stats = useSelector(store => store.stats);

  const calculateTrend = (array) => {
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

  return (
    <>
      Total Production: {formatNumber(stats.totalProduction)}
      <h3>Resources:</h3>
      <p>Seeds: {resources.seeds[resources.seeds.length - 1]}</p>
      <p>Cucumbers: {formatNumber(resources.cucumbers[resources.cucumbers.length - 1])} ( {calculateTrend(resources.cucumbers)}/s )</p>
      <p>Pickles: {formatNumber(resources.pickles[resources.pickles.length - 1])} ( {calculateTrend(resources.pickles)}/s )</p>
      <h3>Plants: {formatNumber(countPlants(plants))}</h3>
      <p>Growth Rate: {totalGrowthRate} / s</p>
      <p>Max Yield: {maxYield}</p>
      <p>Average Age: {averageAge}</p>
      <p>Ripe Cucumbers: {ripeCucumbers}</p>
      <RobotData />
    </>
  )
}

export default Resources;