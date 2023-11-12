import { Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux"

function CheatsForTesting() {
    const dispatch = useDispatch();
    const stats = useSelector(store => store.stats);
    

    const addSeeds = () => {
        dispatch({ type: 'resources/changeResources', payload: { title: 'seeds', value: 100 } });
    }
    const addMoreSeeds = () => {
        dispatch({ type: 'resources/changeResources', payload: { title: 'seeds', value: 1000 } });
    }
    const increaseBotSpeed = () => {
        dispatch({ type: 'robots/changeSpeed', payload: { title: 'picker', value: 1 } });
        dispatch({ type: 'robots/changeSpeed', payload: { title: 'planter', value: 1 } });
        dispatch({ type: 'robots/changeSpeed', payload: { title: 'pickler', value: 1 } });
    }

    const addBots = () => {
        dispatch({ type: 'robots/addBot', payload: { title: 'picker', value: 5 } });
        dispatch({ type: 'robots/addBot', payload: { title: 'planter', value: 5 } });
        dispatch({ type: 'robots/addBot', payload: { title: 'pickler', value: 5 } });
    }
    const addPickles = (value) => {
        dispatch({ type: 'resources/changeResources', payload: { title: 'pickles', value: value } });
        dispatch({ type: 'stats/setStats', payload: { title: 'totalProduction', value: value } });
    }
    const resetStore = () => {
        dispatch({ type: 'RESET_ENTIRE_STORE' });

    }
    const addCucumbers = () => {
        dispatch({ type: 'resources/changeResources', payload: { title: 'cucumbers', value: 100 } })
    }

    const increaseGrowthRate = () => {
        dispatch({ type: 'plants/addPercentageTo', payload: { title: 'growthRate', value: 20 } });
    }

    const addMoreBots = (value, bot) => {
        dispatch({ type: 'robots/addBot', payload: { title: bot, value: value } })
    }

    const upgradeKiosk = () => {
        dispatch({ type: 'buildings/pushOption', payload: { title: "Farmer's Roadside Kiosk", value: 5000 } })
        dispatch({ type: 'buildings/pushOption', payload: { title: "Farmer's Roadside Kiosk", value: 10000 } })
    }

    const resetBuildings = () => {
        dispatch({ type: 'buildings/resetBuildings' });
    }

    const resetUpgrades = () => {
        dispatch({ type: 'upgrades/resetUpgrades' });
    }

    const resetRobotMenu = () => {
        dispatch({ type: 'robotsMenu/resetMenu' })
    }

    const runPlayerGuide = () => {
        dispatch({ type: 'stats/toggleActive', payload: { title: 'playGuide' } });
        console.log(stats.playGuide);
    }

    const RainThePickles = () => {
        dispatch({ type: 'SET_RAIN'});
    }

    return (
        <div className="cheatBox">
            <br />
            <button onClick={increaseGrowthRate}>+20% growth rate</button><br />
            <button onClick={addSeeds}>Add 100 Seeds</button><br />
            <button onClick={addMoreSeeds}>Add 1000 Seeds</button><br />
            <button onClick={increaseBotSpeed}>Bot Speed +1</button><br />
            <button onClick={addBots}>+5 Bots</button><br />
            <button onClick={() => addMoreBots(10000, 'picker')}>Add 10,000 Pickers</button><br />
            <button onClick={() => addMoreBots(10000, 'pickler')}>Add 10,000 Picklers</button><br />
            <button onClick={addCucumbers}>+100 cucumbers</button><br />
            <Divider />
            <br />
            <button onClick={() => addPickles(1000)}>+1,000 Pickles</button><br />
            <button onClick={() => addPickles(5000)}>+5,000 Pickles</button><br />
            <button onClick={() => addPickles(50000)}>+50,000 Pickles</button><br />
            <button onClick={() => addPickles(500000)}>+500,000 Pickles</button><br />
            <br />
            <Divider />
            <button onClick={upgradeKiosk}>Upgrade Kiosk</button><br />
            <button onClick={resetBuildings}>Reset Buildings</button>
            <button onClick={resetUpgrades}>Reset Upgrades</button>
            <button onClick={resetRobotMenu}>Reset Robot Menu</button>
            <button onClick={resetStore}>Reset the Whole Game</button>
            <button onClick={runPlayerGuide}>Run Player Guide</button>
            <button onClick={RainThePickles}>Rain the Pickles!!!</button>
        </div>
    )
}

export default CheatsForTesting;