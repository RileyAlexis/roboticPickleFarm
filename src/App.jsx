//React
import react from 'react';
import {useState, useEffect} from 'react';

//Libraries
import axios from 'axios';

//CSS
import './app.css';

//Components
import Resources from './components/Resources';
import GameMenu from './components/GameMenu';
import MainBox from './components/MainBox';
import RobotData from './components/RobotData';
import LogBox from './components/LogBox';
import PlantsList from './components/PlantsList';

//Modules
const engine = require('./modules/engine'); //Primary game engine

// //Game Objects
let mainMenu = [
  {name: 'Plant Seed', onClick: engine.plantSeed, display: true},
  {name: 'Pick Cucumbers', onClick: engine.pickCucumbers, display: true},
  {name: 'Build Robot', onClick: 'engine.buildRobot', display: false},
  {name: 'Buy Seeds', onClick: engine.buySeeds, display: false}
  
];


function App() {

//State Variables
  const [resources, setResources] = useState(engine.resources);
  const [mainBoxMenuItems, setMainBoxMenuItems] = useState(mainMenu);
  const [plants, setPlants] = useState(engine.plants);
  const [cycle, setCycle] = useState(engine.cycle);

  //Updates all stats each game interval(default 1/sec);
  function runUpdate() {

    engine.updatePlants();

    if (engine.resources.cucumbers >= 50) {mainMenu[3].display = true;}
    setMainBoxMenuItems(mainMenu);
    setResources(engine.resources);
    setPlants(engine.plants);
    setCycle(engine.cycle);
}

//Sets game timer based on engine.gameSpeed setting
useEffect(() => {
  const interval = setInterval(() => {
    runUpdate();
  }, engine.gameSpeed);
  return () => clearInterval(interval);

  }, []);
// console.log(plants[0]?.ripeCucumbers, plants[0]?.currentYield);
  return (
    <div className="container">
      <div className="game-menu">
        <GameMenu />
      </div>
      <div className="main-menu">
        
      </div>
      <div className="resources-box">
          <Resources resources={resources} />
          <PlantsList plants={plants} engine={engine}/>
            </div>
        <div className="robot-box">
          {/* <RobotData robotsState={robotsState}/>  */}
        </div>
      <div className="main-box">
        <MainBox mainBoxMenuItems={mainBoxMenuItems} engine={engine}/>
      </div>
      <LogBox log={engine.log} />

    </div>
  );
}

export default App;
