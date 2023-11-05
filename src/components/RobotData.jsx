import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import TipBox from "./TipBox";

import { formatNumber } from "../modules/utilFunction";

function RobotData() {

  const robots = useSelector(store => store.robots);
  const pickerActive = useSelector(store => store.stats.pickerActive);
  const planterActive = useSelector(store => store.stats.planterActive);
  const picklerActive = useSelector(store => store.stats.picklerActive);
  return (
    <> 
      <Typography variant="h7" sx={{ fontWeight: 700, mt: '15px', mb: '15px' }}>Robots:</Typography>
      <Typography variant="body">
        {/* Placing the TipBox to not include the active tag prevents the tooltip from shifting position */}
        <TipBox data={`Running at ${formatNumber(robots.planterBots.value * robots.planterSpeed)} /s`}>
          <span>Planter Bots: {formatNumber(robots.planterBots.value)} at {robots.planterSpeed} /s </span>
        </TipBox>
        {planterActive &&
          <span>- Planting</span>
        }
      </Typography>
      <Typography variant="body">
        <TipBox data={`Running at ${formatNumber(robots.pickerBots.value * robots.pickerSpeed)} /s`}>
          <span>Picker Bots: {formatNumber(robots.pickerBots.value)} at {robots.pickerSpeed} /s </span>
        </TipBox>
        {pickerActive &&
          <span>- Picking</span>
        }
      </Typography>
      <Typography variant="body">
        <TipBox data={`Running at ${formatNumber(robots.picklerBots.value * robots.picklerSpeed)} /s`}>
          <span>Pickling Bots: {formatNumber(robots.picklerBots.value)} at {robots.picklerSpeed} /s </span>
        </TipBox>
        {picklerActive &&
          <span>- Pickling</span>
        }
      </Typography>
    </>
  )
}

export default RobotData;