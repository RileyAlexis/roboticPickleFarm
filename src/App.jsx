//React
import react from 'react';
import { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

//CSS
import './app.css';

//Components
import Resources from './components/Resources';
import GameMenu from './components/GameMenu';
import MainBox from './components/MainBox';
import LogBox from './components/LogBox';
import LandingPage from './components/landingPage';

//Modules
import { updateTicker } from './modules/engine';

//Material UI
import { Typography } from '@mui/material';

function App() {

  //Redux Store variables
  const authorized = useSelector(store => store.authorized);
  const gameSpeed = useSelector(store => store.gameSpeed);
  const dispatch = useDispatch();

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
        <Typography variant="h6">Robotic Pickle Farm</Typography>
      </div>
      <div className="game-Menu-Box">
        <GameMenu />
        </div>
        <div className="resources-box">
          <Resources /> 
          </div>
      <div className="main-menu-box">
      <GameMenu />
      </div>
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
