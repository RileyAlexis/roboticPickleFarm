import { useSelector } from "react-redux";

function RobotData () {

    const planterBots = useSelector(store => store.planterBots);
    const pickerBots = useSelector(store => store.pickerBots);
    const picklerBots = useSelector(store => store.picklerBots);

  return (
            <>
            <h3>robotsState:</h3>
            <li>Planter Bots: {planterBots.qty}</li>
            <li>Picker Bots: {pickerBots.qty}</li>
            <li>Picking Rate: {picklerBots.qty}</li>
            </>
            )
            


}

export default RobotData;