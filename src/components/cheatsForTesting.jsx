import { UseSelector, useDispatch, useSelector } from "react-redux"

function CheatsForTesting() {
    const dispatch = useDispatch();
    const plantSettings = useSelector(store => store.plantSettings);
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
        dispatch({ type: 'resources/changeResources', payload: {title: 'pickles', value: 50000 }});
        dispatch({ type: 'stats/setStats', payload: {title: 'totalProduction', value: 50000 }});
    }
    const increaseSeed = () => {
        let value = (plantSettings.seedChance * 0.1) + plantSettings.seedChance;
        console.log(value);
        dispatch({ type: 'plantSettings/changePlantSettings', payload: {title: 'seedChance', value: value}});
        // dispatch({ type: 'plants/changeAllSeedChance', payload: value })
    }

    const resetStore = () => {
        dispatch({ type: 'RESET_ENTIRE_STORE'});
        
    }

    return (
        <div className="cheatBox">
            <br />
        <button onClick={addSeeds}>Add 100 Seeds</button><br />
        <button onClick={addMoreSeeds}>Add 1000 Seeds</button><br />
        <button onClick={increaseBotSpeed}>Bot Speed +1</button><br />
        <button onClick={addBots}>+5 Bots</button><br />
        <button onClick={addPickles}>+50000 Pickles</button><br />
        <button onClick={increaseSeed}>+10% Seedchance</button><br />
        <button onClick={resetStore}>Reset the Whole Game</button>
            
        </div>


    )
}

export default CheatsForTesting;