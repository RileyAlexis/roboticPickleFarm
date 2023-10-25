import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { styled } from '@mui/material/styles';

import TipBox from "./TipBox";


import { formatNumber, countPlants, averageProperty } from "../modules/utilFunction";

function PlantsList () {
    const plants = useSelector(store => store.plants);
    const ripeCucumbers = useSelector(store => store.stats.ripeCucumbers);
    const maxYield = useSelector(store => store.stats.maxYield);
    const maxAge = useSelector(store => store.plantSettings.maxAge);
    const totalGrowthRate = useSelector(store => store.stats.totalGrowthRate)
    const seedChance = useSelector(store => store.plantSettings.seedChance);
    const maxedOut = useSelector(store => store.stats.totalMaxedOut);

    return (
        <>
        <br /><br />
        <Typography variant="h7" sx={{ fontWeight: 700, mt: '15px', mb: '15px' }}>Plants: {formatNumber(countPlants(plants))}</Typography>
      <br />
    <TipBox title="Total Growth Rate" data="Average growth rate for all plants">
        <Typography variant="body">Growth Rate: {formatNumber(totalGrowthRate)} /s </Typography><br />
        </TipBox>
        <br />
      
      <TipBox data="Each plant has a chance of creating a plantable seed on each cycle">
      <Typography variant="body">Seed Chance /s: {parseFloat(averageProperty(plants, 'seedChance')).toFixed(4)}%</Typography>
      </TipBox>
      <br />
      <TipBox data="Average Age of all plants / Once a plant reaches its maximum age it will be retired">
      <Typography variant="body">Average Age: {parseFloat(averageProperty(plants, 'age')).toFixed(2)} / {maxAge} </Typography>
      </TipBox>
      <br />
      <TipBox data="The # of plants that have stopped growing because they're full">
      <Typography variant="body">Maxed Out: {formatNumber(maxedOut)}</Typography>
      </TipBox>
      <br />
      <TipBox data="Ripe cucumbers can be picked / maximum # of cucumbers that can stay on the vine">
      <Typography variant="body">Ripe Cucumbers: {formatNumber(ripeCucumbers)} / {formatNumber(maxYield)}</Typography>
      </TipBox>
      <br />
      </>
    )

        }

export default PlantsList;