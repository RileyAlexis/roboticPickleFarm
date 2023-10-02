import { useSelector } from "react-redux";

function Resources () {

    const resources = useSelector(store => store.resources);
    const plants = useSelector(store => store.plants);
    let totalGrowth = 0;
    let maxYield = 0;
    let averageAge = 0;
    let ripeCucumbers = 0;

    const runStats = plants.forEach((plant) => {
        totalGrowth += plant.growthRate;
        maxYield += plant.maxYield;

        averageAge += Math.floor(plant.age / plants.length * 100);
        ripeCucumbers += plant.ripeCucumbers;
    })
        
    return (
        <>
        <h3>Resources:</h3>
        {Object.keys(resources).map(key => {
            if (resources[key] > 0)
            return (
                <li key={key}>{key}:{resources[key]}</li>
            )
            else return (null);
        })}
        <h3>Plants: {plants.length}</h3>
        <p>Growth Rate: {totalGrowth} / s</p>
        <p>Max Yield: {maxYield}</p>
        <p>Average Age: {averageAge}</p>
        <p>Ripe Cucumbers: {ripeCucumbers}</p>
        </>
    )
}

export default Resources;