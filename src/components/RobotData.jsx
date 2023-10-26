import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import TipBox from "./TipBox";

import { formatNumber } from "../modules/utilFunction";

function RobotData () {

    const robots = useSelector(store => store.robots);
    const pickerActive = useSelector(store => store.stats.pickerActive);
    const planterActive = useSelector(store => store.stats.planterActive);
    const picklerActive = useSelector(store => store.stats.picklerActive);
  return (
            <>
            <br />
            <Typography variant="h7" sx={{ fontWeight: 700, mt: '15px', mb: '15px' }}>Robots:</Typography>
            <br />
           
            <Typography variant="body">
              {/* Placing the TipBox to not include the active tag prevents the tooltip from shifting position */}
            <TipBox data={`Running at ${formatNumber(robots.planterBots * robots.planterSpeed)} /s`}>
              Planter Bots: {formatNumber(robots.planterBots)} at {robots.planterSpeed} /s
              </TipBox>
              {planterActive &&
               <span>- Planting</span>
              }
              </Typography>
                
              <br />
              <Typography variant="body">
              <TipBox data={`Running at ${formatNumber(robots.pickerBots * robots.pickerSpeed)} /s`}>
              Picker Bots: {formatNumber(robots.pickerBots)} at {robots.pickerSpeed} /s
              </TipBox>
              {pickerActive &&
               <span>- Picking</span>
              }
              </Typography>
              <br />
              <Typography variant="body">
              <TipBox data={`Running at ${formatNumber(robots.picklerBots * robots.picklerSpeed)} /s`}>
              Pickling Bots: {formatNumber(robots.picklerBots)} at {robots.picklerSpeed} /s
              </TipBox>
              {picklerActive &&
               <span>- Pickling</span>
              }
               </Typography>
              
           
            </>
            )
            


}

export default RobotData;