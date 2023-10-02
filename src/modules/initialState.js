import { plantSeed, pickCucumbers, makePickles, buyBot } from "./engine";

export const valFarmMenu = [
    {name: 'Plant', coolDown: 4000, show: true },
    {name: 'Pick', coolDown: 2000, show: true },
    {name: 'Buy Seeds', coolDown:2000, show: false},
    {name: 'Pickle', coolDown: 5000, show: true}
];

export const valRobotMenu = [
    {name: 'Buy Planter Bot', coolDown: 4000, show: true },
    {name: 'Buy Picker Bot', coolDown: 2000, show: true},
    {name: 'Buy Pickler Bot', coolDown:2000, show: false},
];

//Sets up tabs in Main Box
export const valLocationMenu = [
    {id: 'farm', title: 'Farm', show: true },
    {id: 'robots', title: 'Robots', show: false },
    {id: 'buildings', title: 'Buildings', show: false },
    {id: 'powerUps', title: 'Power Ups', show:false },
];

//Creates function calls for buttons based on name property
export const valButtonCall = (name) => {
    console.log(name);
    switch (name) {
        case 'Plant': plantSeed(); break;
        case 'Pick': pickCucumbers(); break;
        case 'Pickle': makePickles(); break;
        case 'Buy Planter Bot': buyBot('Planter'); break;
        case 'Buy Picker Bot': buyBot('Picker'); break;
        case 'Buy Pickler Bot': buyBot('Pickler'); break;
    }
}
