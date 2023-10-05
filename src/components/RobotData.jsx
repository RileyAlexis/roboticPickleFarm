import { useSelector } from "react-redux";

function RobotData () {

    const robots = useSelector(store => store.robots);
    const pickerActive = useSelector(store => store.stats.pickerActive);
    const planterActive = useSelector(store => store.stats.planterActive);
    const picklerActive = useSelector(store => store.stats.picklerActive);
  return (
            <>
            <h3>Robots:</h3>
            <li>Planter Bots: 
              {robots.planterBots} 
              at 
              {robots.planterSpeed} /s
              {planterActive &&
               <span>- Planting</span>
              }
              </li>
            <li>Picker Bots: 
              {robots.pickerBots} 
              at 
              {robots.pickerSpeed} /s
              {pickerActive &&
               <span>- Picking</span>
              }
              </li>
            <li>Pickling Bots: 
              {robots.picklerBots} 
              at 
              {robots.picklerSpeed} /s
              {picklerActive &&
               <span>- Pickling</span>
              }
              </li>
            </>
            )
            


}

export default RobotData;