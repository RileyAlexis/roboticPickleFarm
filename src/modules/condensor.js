import { storeInstance as store} from './store';
import { deepUnfreeze } from './deepUnfreeze';

export function condensor(plants) {
    let setDead = true;
    plants.forEach((plant) => {
        plant.modifier += 1;
        setDead = !setDead;
        plant.isDead = setDead;
    });
    let condensed = plants.filter(plant => !plant.isDead);
    let discarded = plants.filter(plant => plant.isDead);
    console.log(condensed.length, discarded.length);
    return condensed;

}