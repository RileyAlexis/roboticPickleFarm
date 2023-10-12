import { UseSelector, useDispatch, useSelector } from "react-redux"

function CheatsForTesting() {
    const dispatch = useDispatch();
    const plantSettings = useSelector(store => store.plantSettings);
    const robots = useSelector(store => store.robots);
    const resources = useSelector(store => store.resources);

    const addSeeds = () => {
        dispatch({type: 'resources/changeResources', payload: { title: 'seeds', value: 100 }});
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
    return (
        <div className="cheatBox">
        <button onClick={addSeeds}>Add 100 Seeds</button>
        <button onClick={increaseBotSpeed}>Bot Speed +1</button>
        <button onClick={addBots}>+5 Bots</button>
        <button onClick={addPickles}>+50000 Pickles</button>
            

        
        </div>


    )
}

export default CheatsForTesting;