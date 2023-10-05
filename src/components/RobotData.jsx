import { useSelector } from "react-redux";

function RobotData () {

    const robots = useSelector(store => store.robots);

  return (
            <>
            <h3>Robots:</h3>
            <li>Planter Bots: {robots.planterBots} at {robots.planterSpeed} /s</li>
            <li>Picker Bots: {robots.pickerBots} at {robots.pickerSpeed} /s</li>
            <li>Picking Rate: {robots.picklerBots} at {robots.picklerSpeed} /s</li>
            </>
            )
            


}

export default RobotData;