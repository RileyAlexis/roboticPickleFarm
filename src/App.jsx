//React
import react from 'react';
import { useEffect} from 'react';
import { useSelector } from 'react-redux';

//CSS
import './App.css';

//Components
import GameMenu from './components/GameMenu';
import MainBox from './components/MainBox/MainBox';
import LogBox from './components/LogBox/LogBox';
import LandingPage from './LandingPage/landingPage';
import TotalGoal from './components/GoalsBox/TotalGoal';

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
  }, [gameSpeed]);

  return (
    <div className="container">
      {!authorized &&
      <>
        <div className="title-box">
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Robotic Pickle Farm</Typography>
          </div>
          <LandingPage /> 
          <div className="intro-box">
          <Typography variant="h6">About Robotic Pickle Farm</Typography><br /><br />
            <Typography variant="body">Robotic Pickle Farm is an incremental/clicker 
            game created by Riley Alexis as her first web dev project. 
            The game is in the spirit of Universal Paperclips, A Dark Room or 
            Kittens Game. It involves an iterative game style where a player's 
            goal is to make as many pickles as possible. 
            The eventual goal is to produce 2.8 trillion pickles, roughly 
            equal to the annual global output of planet Earth.
            <br /><br /><br />
            To begin a new game log in or create a user account.
            </Typography>
            <br /><br /><br />
            <Typography variant="body">
                Robotic Pickle Farm is created using React, Redux, Redux-Saga, 
                Node, Express and Postgres. User sessions handled by JSON Web 
                Token and Bcrypt.
            </Typography>
            <br /><br /><br /><br />
            <Typography variant="caption">
                Source Code:  <a href="https://github.com/RileyAlexis/roboticPickleFarm">
                     GitHub: Robotic Pickle Farm</a>
                    </Typography>

          </div>
          </>
      }
      {authorized &&
      <>
      {playGuide && 
        <PlayGuide />
      }
      <div className="title-box">
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Robotic Pickle Farm</Typography>
      </div>
      <div className="game-Menu-Box">
        <GameMenu />
        </div>
        <div className="resources-box">
          <MainBoxLeft />
          </div>
      <div className="main-menu-box">
        <TotalGoal />
      
      </div>
      <div className="main-box">
        
        <MainBox />
      </div>
      <div className="log-box">
        <LogBox />
        </div>
      </>
      }
    </div> 
  );
}

export default App;
