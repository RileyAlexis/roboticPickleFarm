//React
import react from 'react';
import {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
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
import LandingPage from './landingPage';

//Material UI
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';


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

  //Redux Store variables
  const userId = useSelector(store => store.userId);
  const authorized = useSelector(store => store.authorized);


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

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


  return (
    <div className="container">
      {!authorized &&
          <LandingPage /> 
      }
      {authorized &&
      <>
      <div className="game-Menu-Box">
        <GameMenu />
        </div>
      
      <div className="main-menu-box">
        <GameMenu />
      </div>

      <div className="resources-box">
          <Resources resources={resources} />
          <PlantsList plants={plants} engine={engine} />
          <RobotData engine={engine} />
          </div>

        <MainBox 
          locationMenu={locationMenu} 
          farmMenuItems={farmMenuItems} 
          robotMenu={robotMenu}
          engine={engine}/>
      <LogBox log={engine.log} />
      </>
      }
    </div>
    
      
  );
}

export default App;
