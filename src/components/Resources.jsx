import { useSelector } from "react-redux";

import RobotData from "./RobotData";

function Resources () {

    const resources = useSelector(store => store.resources);
    const plants = useSelector(store => store.plants);
    const ripeCucumbers = useSelector(store => store.stats.ripeCucumbers);
    const maxYield = useSelector(store => store.stats.maxYield);
    const totalGrowthRate = useSelector(store => store.stats.totalGrowthRate)
    const averageAge = useSelector(store => store.stats.averageAge);
    const stats = useSelector(store => store.stats);

    return (
        <>
        <h4>Total Production: {stats.totalProduction}</h4>
        <h3>Resources:</h3>
        {Object.keys(resources).map(key => {
            if (resources[key] > 0)
            return (
                <li key={key}>{key}:{resources[key]}</li>
            )
            else return (null);
        })}
        <h3>Plants: {plants.length}</h3>
        <p>Growth Rate: {totalGrowthRate} / s</p>
        <p>Max Yield: {maxYield}</p>
        <p>Average Age: {averageAge}</p>
        <p>Ripe Cucumbers: {ripeCucumbers}</p>
        <RobotData />
        </>
    )
}

export default Resources;