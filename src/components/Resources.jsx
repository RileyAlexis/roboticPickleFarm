import { useSelector } from "react-redux";

import { Typography } from "@mui/material";
import { formatNumber, calculateTrend } from "../modules/utilFunction";

function Resources() {

  const resources = useSelector(store => store.resources);

  return (
    <>
      <Typography variant="h7" sx={{ fontWeight: 700, mt: '15px', mb: '15px' }}>Resources:</Typography>
      <br />
      <Typography variant="body">Seeds: {resources.seeds[resources.seeds.length - 1]}</Typography>
      <br />
      <Typography variant="body">Cucumbers: {formatNumber(resources.cucumbers[resources.cucumbers.length - 1])} ( {calculateTrend(resources.cucumbers)}/s )</Typography>
      <br />
      <Typography variant="body">Pickles: {formatNumber(resources.pickles[resources.pickles.length - 1])} ( {calculateTrend(resources.pickles)}/s )</Typography>
    </>
  )
}

export default Resources;