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
import GameButton from './components/GameButton';

//Modules
const engine = require('./modules/engine'); //Primary game engine




function App() {

//State Variables
  const [resources, setResources] = useState(engine.resources);
  const [farmMenuItems, setFarmMenuItems] = useState(engine.farmMenu);
  const [plants, setPlants] = useState(engine.plants);
  const [cycle, setCycle] = useState(engine.cycle);
  const [locationMenu, setLocationMenu] = useState(engine.locationMenu);
  const [robotMenu, setRobotMenu] = useState(engine.robotMenu);
  //Updates all stats each game interval(default 1/sec);
  function runUpdate() {

    engine.updatePlants();
    setFarmMenuItems([...engine.farmMenu]);
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
        <MainBox 
          locationMenu={locationMenu} 
          farmMenuItems={farmMenuItems} 
          robotMenu={robotMenu}
          engine={engine}/>
      <LogBox log={engine.log} />

    </div>
  );
}

export default App;
