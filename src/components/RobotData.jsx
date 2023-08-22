function RobotData ({robotsState}) {
           
    if (robotsState !== null && robotsState[0]) 
        {return (
            <>
            <h3>robotsState:</h3>
            <li>Robot Count: {robotsState.length}</li>
            <li>Picking Rate: {robotsState[0].picks}</li>
            <li>Planting Rate: {robotsState[0].plants}</li>
            </>
            )}
            
        else {
        return (null);}

}

export default RobotData;