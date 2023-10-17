import { useSelector } from "react-redux";

import { Typography } from "@mui/material";
import { formatNumber, calculateTrend } from "../modules/utilFunction";

function Resources() {

  const resources = useSelector(store => store.resources);
  let cucumberTrend = calculateTrend(resources.cucumbers);
  let picklesTrend = calculateTrend(resources.pickles);

  return (
    <>
      <Typography variant="h7" sx={{ fontWeight: 700, mt: '15px', mb: '15px' }}>Resources:</Typography>
      <br />
      <Typography variant="body">Seeds: {resources.seeds[resources.seeds.length - 1]}</Typography>
      <br />
      <Typography variant="body">Cucumbers: {formatNumber(resources.cucumbers[resources.cucumbers.length - 1])} ( {cucumberTrend.sign}{cucumberTrend.trend} /s )</Typography>
      <br />
      <Typography variant="body">Pickles: {formatNumber(resources.pickles[resources.pickles.length - 1])} ( {picklesTrend.sign}{cucumberTrend.trend} )</Typography>
    </>
  )
}

export default Resources;