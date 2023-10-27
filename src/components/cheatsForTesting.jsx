import { UseSelector, useDispatch, useSelector } from "react-redux"

function CheatsForTesting() {
    const dispatch = useDispatch();
    const robots = useSelector(store => store.robots);
    const resources = useSelector(store => store.resources);

    const addSeeds = () => {
        dispatch({type: 'resources/changeResources', payload: { title: 'seeds', value: 100 }});
    }
    const addMoreSeeds = () => {
        dispatch({type: 'resources/changeResources', payload: { title: 'seeds', value: 1000 }});
    }
    const increaseBotSpeed = () => {
        dispatch({ type: 'robots/changeSpeed', payload: {title: 'picker', value: 1 }});
        dispatch({ type: 'robots/changeSpeed', payload: {title: 'planter', value: 1 }});
        dispatch({ type: 'robots/changeSpeed', payload: {title: 'pickler', value: 1 }});
    }

    const addBots = () => {
        dispatch({ type: 'robots/addBot', payload: {title: 'picker', value: 5 }});
        dispatch({ type: 'robots/addBot', payload: {title: 'planter', value: 5 }});
        dispatch({ type: 'robots/addBot', payload: {title: 'pickler', value: 5 }});
    }
    const addPickles = () => {
        dispatch({ type: 'resources/changeResources', payload: {title: 'pickles', value: 500000 }});
        dispatch({ type: 'stats/setStats', payload: {title: 'totalProduction', value: 500000 }});
    }
    const resetStore = () => {
        dispatch({ type: 'RESET_ENTIRE_STORE'});
        
    }
    const addCucumbers = () => {
        dispatch({ type: 'resources/changeResources', payload: { title: 'cucumbers', value: 100 }})
    }

    const increaseGrowthRate = () => {
        dispatch({ type: 'plants/addPercentageTo', payload: { title: 'growthRate', value: 20 }});
    }

    const addMoreBots = (value, bot) => {
        dispatch({ type: 'robots/addBot', payload: { title: bot, value: value }})
    }

    const upgradeKiosk = () => {
        dispatch({ type: 'buildings/pushOption', payload: { title: "Farmer's Roadside Kiosk", value: 5000 }})
        dispatch({ type: 'buildings/pushOption', payload: { title: "Farmer's Roadside Kiosk", value: 10000 }})
    }

    const resetBuildings = () => {
        dispatch({ type: 'buildings/resetBuildings'});
    }

    const resetUpgrades = () => {
        dispatch({ type: 'upgrades/resetUpgrades'});
    }

    return (
        <div className="cheatBox">
            <br />
        <button onClick={increaseGrowthRate}>+20% growth rate</button><br />
        <button onClick={addSeeds}>Add 100 Seeds</button><br />
        <button onClick={addMoreSeeds}>Add 1000 Seeds</button><br />
        <button onClick={increaseBotSpeed}>Bot Speed +1</button><br />
        <button onClick={addBots}>+5 Bots</button><br />
        <button onClick={() => addMoreBots(1000, 'picker')}>Add 1000 Pickers</button><br />
        <button onClick={() => addMoreBots(1000, 'pickler')}>Add 1000 Picklers</button><br />
        <button onClick={addCucumbers}>+100 cucumbers</button><br />
        <button onClick={addPickles}>+500000 Pickles</button><br />
        <button onClick={upgradeKiosk}>Upgrade Kiosk</button><br />
        <button onClick={resetBuildings}>Reset Buildings</button>
        <button onClick={resetUpgrades}>Reset Upgrades</button>
        <button onClick={resetStore}>Reset the Whole Game</button>
            
        </div>


    )
}

export default CheatsForTesting;