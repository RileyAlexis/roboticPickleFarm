
//Condenses the number of objects to half and maintains correct numbers by increasing the modifier value
export function condensor(plants) {
    let setDead = true;
    plants.forEach((plant) => {
        setDead = !setDead;
        plant.isDead = setDead;
    });
    let condensed = plants.filter(plant => !plant.isDead);
    let discarded = plants.filter(plant => plant.isDead);
    for (let i = 0; i < discarded.length; i++) {
        if (discarded[i].modifier) {
        condensed[i].modifier += discarded[i].modifier;
        condensed[i].maxAge += discarded[i].maxAge;
        condensed[i].age += discarded[i].age;
    }}
    return condensed;

}