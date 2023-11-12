//React
import react from 'react';
import { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

//CSS
import './App.css';

//Components
import GameMenu from './components/GameMenu';
import MainBox from './components/MainBox/MainBox';
import LogBox from './components/LogBox/LogBox';
import LandingPage from './components/LandingPage/landingPage'
import TotalGoal from './components/GoalsBox/TotalGoal';
import WinGame from './components/WinGame/WinGame';

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

    if (event.metaKey && event.key === '1')
    {
      dispatch({ type: 'resources/changeResources', payload: { title: 'pickles', value: 500 }});
      dispatch({ type: 'stats/setStats', payload: { title: 'totalProduction', value: 500 } });
      dispatch({ type: 'resources/changeResources', payload: { title: 'cucumbers', value: 50 }});
      dispatch({ type: 'log/addLog', payload: {line: 'Cheat Activated! +500 pickles, +50 Cucumbers', cycle: cycles }})
    }
    if (event.metaKey && event.key === '2')
    {
      dispatch({ type: 'resources/changeResources', payload: { title: 'pickles', value: 1000 }});
      dispatch({ type: 'stats/setStats', payload: { title: 'totalProduction', value: 1000 } });
      dispatch({ type: 'log/addLog', payload: {line: 'Cheat Activated! +1000 pickles', cycle: cycles }})
    }
    if (event.metaKey && event.key === '3')
    {
      dispatch({ type: 'resources/changeResources', payload: { title: 'pickles', value: 3500 }});
      dispatch({ type: 'stats/setStats', payload: { title: 'totalProduction', value: 3500 } });
      dispatch({ type: 'log/addLog', payload: {line: 'Cheat Activated! +3500 pickles', cycle: cycles }})
    }
    if (event.metaKey && event.key === '4')
    {
      dispatch({ type: 'resources/changeResources', payload: { title: 'pickles', value: 60000 }});
      dispatch({ type: 'stats/setStats', payload: { title: 'totalProduction', value: 60000 } });
      dispatch({ type: 'log/addLog', payload: {line: 'Cheat Activated! +60,000 pickles', cycle: cycles }})
    }
    if (event.metaKey && event.key === '5')
    {
      dispatch({ type: 'resources/changeResources', payload: { title: 'pickles', value: 8000000 }});
      dispatch({ type: 'stats/setStats', payload: { title: 'totalProduction', value: 8000000 } });
      dispatch({ type: 'plants/addPercentageTo', payload: { title: 'plantCount', value: 500 }});
      dispatch({ type: 'robots/addBot', payload: { title: 'picker', value: 5 } });
      dispatch({ type: 'robots/addBot', payload: { title: 'pickler', value: 5 } });
      dispatch({ type: 'log/addLog', payload: {line: 'Cheat Activated! +8,000,000 pickles, x5 plants, +500 bots', cycle: cycles }})
    }
    if (event.metaKey && event.key === '6')
    {
      dispatch({ type: 'resources/changeResources', payload: { title: 'pickles', value: 900000000 }});
      dispatch({ type: 'stats/setStats', payload: { title: 'totalProduction', value: 900000000 } });
      dispatch({ type: 'plants/addPercentageTo', payload: { title: 'plantCount', value: 10000 }});
      dispatch({ type: 'robots/addBot', payload: { title: 'picker', value: 5000 } });
      dispatch({ type: 'robots/addBot', payload: { title: 'pickler', value: 5000 } });
      dispatch({ type: 'log/addLog', payload: {line: 'Cheat Activated! +900,000,000 pickles, x10,000 plants, +5,000 bots', cycle: cycles }})
    }
    if (event.metaKey && event.key === '7')
    {
      dispatch({ type: 'resources/changeResources', payload: { title: 'pickles', value: 9000000000 }});
      dispatch({ type: 'stats/setStats', payload: { title: 'totalProduction', value: 9000000000 } });
      dispatch({ type: 'plants/addPercentageTo', payload: { title: 'plantCount', value: 10000 }});
      dispatch({ type: 'robots/addBot', payload: { title: 'picker', value: 10000 } });
      dispatch({ type: 'robots/addBot', payload: { title: 'pickler', value: 10000 } });
      dispatch({ type: 'log/addLog', payload: {line: 'Cheat Activated! +9,000,000,000 pickles, x10,000 plants, +10,000 bots', cycle: cycles }})
    }
  };

  // Add event listener when component mounts
  window.addEventListener('keydown', handleKeyDown);

  return () => { clearInterval(interval);
  window.removeEventListener('keydown', handleKeyDown);
  }
  }, [gameSpeed]);

  return (
    <>
    {eventCondition &&
    <WinGame />
    }
    
    <div className="container">
      {!authorized &&
      <>
        <div className="title-box">
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Robotic Pickle Farm</Typography>
          </div>
          <LandingPage /> 
          <div className="intro-box boxShadowClass">
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
        <div className="resources-box boxShadowClass">
          <MainBoxLeft />
          </div>
      <div className="main-menu-box">
        <TotalGoal />
      
      </div>
      <div className="main-box boxShadowClass">
        
        <MainBox />
      </div>
      <div className="log-box boxShadowClass">
        <LogBox />
        </div>
      </>
      }
    </div> 
    </>
  );
}

export default App;
