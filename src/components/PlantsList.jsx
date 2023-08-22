function PlantsList ({plants, engine}) {
    let ripeCucumbers = 0;

    if (plants !== null && plants[0]) 
        {return (
            <>
        <h3>Plants: {plants.length}</h3>
        <li>Growth Rate: {engine.currentGrowthRate} /sec</li>
        <li>Max Yield: {plants.length * plants[0].maxYield}</li>
        <li>Ripe Cucumbers: {engine.ripeCucumbers}</li>
        <li>Max Age: {plants[0].maxAge} cycles</li>
        <li>Seed Yield: {plants[0].seedYield * plants.length}% /sec</li>
        <li>Surival: {plants[0].survival}%</li>
            </>
            )}
            
        else {
        return (<h3>Plants: {plants.length}</h3>);
        }
        
}

export default PlantsList;