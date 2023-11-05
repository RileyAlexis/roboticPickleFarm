import { useSelector } from "react-redux";
import { Typography } from "@mui/material";

import TipBox from "./TipBox";

import { formatNumber } from "../modules/utilFunction";

function PlantsList() {
  const plants = useSelector(store => store.plants);
  const ripeCucumbers = useSelector(store => store.stats.ripeCucumbers);
  const maxYield = useSelector(store => store.plants.maxYield) * plants.plantCount;
  const totalGrowthRate = plants.plantCount * plants.growthRate;
  const seedChance = useSelector(store => store.plants.seedChance);

  return (
    <>
      <br /><br />
      <Typography variant="h7" sx={{ fontWeight: 700, mt: '15px', mb: '15px' }}>Plants: {formatNumber(plants.plantCount)}</Typography>
      
      <TipBox title="Total Growth Rate" data="Total growth rate for all plants">
        <Typography variant="body">Growth Rate: {formatNumber(parseFloat(totalGrowthRate).toFixed(2))} /s </Typography><br />
      </TipBox>
      
      <TipBox data="Each plant has a chance of creating a plantable seed on each cycle">
        <Typography variant="body">Seed Chance /s: {parseFloat(seedChance).toFixed(6)}%</Typography>
      </TipBox>
      
      <TipBox data="Ripe cucumbers can be picked / maximum # of cucumbers that can stay on the vine">
        <Typography variant="body">Ripe Cucumbers: {formatNumber(ripeCucumbers)} / {formatNumber(parseFloat(maxYield).toFixed(0))}</Typography>
      </TipBox>
      <br />
    </>
  )

}

export default PlantsList;