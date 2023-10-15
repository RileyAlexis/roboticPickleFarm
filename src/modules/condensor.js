
//Condenses the number of objects to half and maintains correct numbers by increasing the modifier value
export function condensor(plants) {
    let setDead = true;
    
    // for (let i = 0; i < plants.length; i++) {

    // }
    plants.forEach((plant) => {
        setDead = !setDead;
        plant.isDead = setDead;
    });
    let condensed = plants.filter(plant => !plant.isDead);
    let discarded = plants.filter(plant => plant.isDead);
    for (let i = 0; i < discarded.length; i++) {
        if (discarded[i].modifier) {
        condensed[i].modifier += discarded[i].modifier;
    }}
    return condensed;

}