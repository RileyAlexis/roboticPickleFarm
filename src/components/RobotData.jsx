import { useSelector } from "react-redux";
import { Typography } from "@mui/material";

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
              Planter Bots: {robots.planterBots} at {robots.planterSpeed} /s
              {planterActive &&
               <span>- Planting</span>
              }
              <br />
              Picker Bots: {robots.pickerBots} at {robots.pickerSpeed} /s
              {pickerActive &&
               <span>- Picking</span>
              }
              <br />
              Pickling Bots: {robots.picklerBots} at {robots.picklerSpeed} /s
              {picklerActive &&
               <span>- Pickling</span>
              }
              </Typography>
            </>
            )
            


}

export default RobotData;