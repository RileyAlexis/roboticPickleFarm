import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { formatNumber, countPlants, averageProperty } from "../modules/utilFunction";

function PlantsList () {
    const plants = useSelector(store => store.plants);
    const ripeCucumbers = useSelector(store => store.stats.ripeCucumbers);
    const maxYield = useSelector(store => store.stats.maxYield);
    const totalGrowthRate = useSelector(store => store.stats.totalGrowthRate)
    const averageAge = useSelector(store => store.stats.averageAge);

    return (
        <>
        <br /><br />
        <Typography variant="h7" sx={{ fontWeight: 700, mt: '15px', mb: '15px' }}>Plants: {formatNumber(countPlants(plants))}</Typography>
      <br />
      <Typography variant="body">Growth Rate: {totalGrowthRate} /s </Typography><br />
      <Typography variant="body">Max Yield: {maxYield}</Typography><br />
      <Typography variant="body">Average Age: {parseFloat(averageProperty(plants, 'age')).toFixed(2)}</Typography><br />
      <Typography variant="body">Ripe Cucumbers: {ripeCucumbers}</Typography><br />
      </>
    )

        }

export default PlantsList;