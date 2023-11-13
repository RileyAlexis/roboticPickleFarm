//React
import react from 'react';
import { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

//CSS
import './App.css';

//Components
import GameMenu from './components/GameMenu/GameMenu';
import MainBox from './components/MainBox/MainBox';
import LogBox from './components/LogBox/LogBox';
import LandingPage from './components/LandingPage/landingPage'
import TotalGoal from './components/GoalsBox/TotalGoal';
import WinGame from './components/WinGame/WinGame';
import About from './components/About';

//Modules
import { updateTicker } from './modules/engine';

//Material UI
import { Typography } from '@mui/material';
import MainBoxLeft from './components/MainBoxLeft';
import PlayGuide from './components/playGuide/PlayGuide';

function App() {

  //Redux Store variables
  const authorized = useSelector(store => store.authorized);
  const gameSpeed = useSelector(store => store.stats.gameSpeed);
  const playGuide = useSelector(store => store.stats.playGuide);
  const cycles = useSelector(store => store.stats.cycles);
  const eventCondition = useSelector(store => store.eventCondition);

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

  const handleKeyDown = (event) => {
    // console.log(event.metaKey, event.altKey, event.shiftKey, event.key);
    if (event.metaKey && event.altKey && event.shiftKey && event.key === 'C' || event.key === 'Ç') {
      dispatch({ type: 'locationMenu/toggleItem', payload: 'cheatOptopns'});
    }
  };

  // Add event listener when component mounts
  window.addEventListener('keydown', handleKeyDown);

  return () => { clearInterval(interval);
  window.removeEventListener('keydown', handleKeyDown);
  }
  }, [gameSpeed]);

  return (  
    <div class="container"> 
    {eventCondition &&
    <WinGame />
    }
        
    {!authorized &&
    <>
      <div class="row">
        <div class="col-md-12 col-sm-12">
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Robotic Pickle Farm</Typography>
        </div>
        </div>
        <div class="row">
        <div class="col-md-6 col-sm-12">
          <About />
          </div>
          <div class="col-md-6 col-sm-12">
          <LandingPage />
          </div>
          </div>
          </>
      }
      {authorized &&
      <>
      {playGuide && 
        <PlayGuide />
      }
      <div class="row">
      <div class="title-box col-md-6 col-sm-7">
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Robotic Pickle Farm</Typography>
      </div>
      <div class="game-Menu-Box col-sm-5">
        <GameMenu />
        </div>
        </div>
        <div class="row">
        <div className="resources-box boxShadowClass col-md-5 col-sm-12">
          <MainBoxLeft />
         <TotalGoal />
         </div>
      
      
      <div className="main-box boxShadowClass col-md-7 col-sm-12">
        
        <MainBox />
      </div>
      </div>
      </>
      }
    </div> 
  );
}

export default App;
