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
        <TipBox data={`Running at ${formatNumber(robots.planterBots * robots.planterSpeed)} /s`}>
          Planter Bots: {formatNumber(robots.planterBots)} at {formatNumber(robots.planterSpeed)} /s
          {planterActive && <span>- Planting</span>}
        </TipBox>
        
      </Typography>
      <Typography variant="body">
        <TipBox data={`Running at ${formatNumber(robots.pickerBots * robots.pickerSpeed)} /s`}>
          Picker Bots: {formatNumber(robots.pickerBots)} at {formatNumber(robots.pickerSpeed)} /s
          {pickerActive && <span>- Picking</span>}
        </TipBox>
        
      </Typography>
      <Typography variant="body">
        <TipBox data={`Running at ${formatNumber(robots.picklerBots * robots.picklerSpeed)} /s`}>
          Pickling Bots: {formatNumber(robots.picklerBots)} at {formatNumber(robots.picklerSpeed)} /s
          {picklerActive && <span>- Pickling</span>}
        </TipBox>
        
      </Typography>
    </>
  )
}

export default RobotData;