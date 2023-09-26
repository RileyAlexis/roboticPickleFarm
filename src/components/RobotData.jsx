function RobotData ({engine}) {
           
  return (
            <>
            <h3>robotsState:</h3>
            <li>Planter Bots: {engine.planterBots.qty}</li>
            <li>Picker Bots: {engine.pickerBots.qty}</li>
            <li>Picking Rate: {engine.picklerBots.qty}</li>
            </>
            )
            


}

export default RobotData;