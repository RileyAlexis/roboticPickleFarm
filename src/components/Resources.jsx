import { useSelector } from "react-redux";

import { Typography } from "@mui/material";
import { formatNumber, calculateTrend } from "../modules/utilFunction";

function Resources() {
  const timeframe = useSelector(store => store.stats.timeframe);
  const resources = useSelector(store => store.resources);
  let cucumberTrend = calculateTrend(resources.cucumbers, timeframe);
  let picklesTrend = calculateTrend(resources.pickles, timeframe);
  let seedTrend = calculateTrend(resources.seeds, timeframe);
  
  return (
    <>
      <Typography variant="h7" sx={{ fontWeight: 700, mt: '15px', mb: '15px' }}>Resources:</Typography>
      <br />
      <Typography variant="body">Seeds: {resources.seeds[resources.seeds.length - 1]}</Typography>
      <Typography variant="caption"> ( {seedTrend.sign}{formatNumber(seedTrend.trend)} /s )</Typography>
      <br />
      <Typography variant="body">Cucumbers: {formatNumber(resources.cucumbers[resources.cucumbers.length - 1])}</Typography>
      <Typography variant="caption"> ( {cucumberTrend.sign}{formatNumber(cucumberTrend.trend)} /s )</Typography>
      <br />
      <Typography variant="body">Pickles: {formatNumber(resources.pickles[resources.pickles.length - 1])}</Typography>
      <Typography variant="caption"> ( {picklesTrend.sign}{formatNumber(picklesTrend.trend)} /s )</Typography>
    </>
  )
}

export default Resources;