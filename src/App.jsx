//React
import react from 'react';
import { useEffect} from 'react';
import { useSelector } from 'react-redux';

//CSS
import './app.css';

//Components
import GameMenu from './components/GameMenu';
import MainBox from './components/MainBox/MainBox';
import LogBox from './components/LogBox';
import LandingPage from './components/landingPage';

//Modules
import { updateTicker } from './modules/engine';

//Material UI
import { Typography } from '@mui/material';
import MainBoxLeft from './components/MainBoxLeft';

function App() {

  //Redux Store variables
  const authorized = useSelector(store => store.authorized);
  const gameSpeed = useSelector(store => store.stats.gameSpeed);

  //Updates all stats each game interval(default 1/sec);
  function runUpdate() {
    updateTicker();
}

//Sets game timer based on gameSpeed setting
useEffect(() => {
  const interval = setInterval(() => {
    runUpdate();
  }, gameSpeed);
  return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      {!authorized &&
          <LandingPage /> 
      }
      {authorized &&
      <>
      <div className="title-box">
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Robotic Pickle Farm</Typography>
      </div>
      <div className="game-Menu-Box">
        <GameMenu />
        </div>
        <div className="resources-box">
          <MainBoxLeft />
          </div>
      {/* <div className="main-menu-box">
      <p></p><br />
      
      </div> */}
      <div className="main-box">
        
        <MainBox />
      </div>
        <LogBox />
      </>
      }
    </div> 
  );
}

export default App;
