//React
import react from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//CSS
import "./App.css";

//Components
import GameMenu from "./components/GameMenu";
import MainBox from "./components/MainBox/MainBox";
import LogBox from "./components/LogBox/LogBox";
import LandingPage from "./components/LandingPage/landingPage";
import TotalGoal from "./components/GoalsBox/TotalGoal";
import WinGame from "./components/WinGame/WinGame";
import MainBoxLeft from "./components/MainBoxLeft";
import PlayGuide from "./components/playGuide/PlayGuide";
import AboutContent from "./components/AboutContent.jsx";

//Modules
import { updateTicker } from "./modules/engine";

//Material UI
import { ThemeProvider } from "@mui/material/styles";
import { Typography, Box, Paper, Grid } from "@mui/material";
import { useMediaQuery } from "@mui/material";

//Themes
import { pickles } from "./modules/themes.js";

function App() {
  //Redux Store variables
  const authorized = useSelector((store) => store.authorized);
  const gameSpeed = useSelector((store) => store.stats.gameSpeed);
  const playGuide = useSelector((store) => store.stats.playGuide);
  const cycles = useSelector((store) => store.stats.cycles);
  const eventCondition = useSelector((store) => store.eventCondition);
  const isSmallScreen = useMediaQuery("(max-width: 680px");
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
      if (
        (event.metaKey &&
          event.altKey &&
          event.shiftKey &&
          event.key === "C") ||
        event.key === "Ç"
      ) {
        dispatch({ type: "locationMenu/toggleItem", payload: "cheatOptopns" });
      }

      if (event.metaKey && event.key === "1") {
        dispatch({
          type: "resources/changeResources",
          payload: { title: "pickles", value: 500 },
        });
        dispatch({
          type: "stats/setStats",
          payload: { title: "totalProduction", value: 500 },
        });
        dispatch({
          type: "resources/changeResources",
          payload: { title: "cucumbers", value: 50 },
        });
        dispatch({
          type: "log/addLog",
          payload: {
            line: "Cheat Activated! +500 pickles, +50 Cucumbers",
            cycle: cycles,
          },
        });
      }
      if (event.metaKey && event.key === "2") {
        dispatch({
          type: "resources/changeResources",
          payload: { title: "pickles", value: 1000 },
        });
        dispatch({
          type: "stats/setStats",
          payload: { title: "totalProduction", value: 1000 },
        });
        dispatch({
          type: "log/addLog",
          payload: { line: "Cheat Activated! +1000 pickles", cycle: cycles },
        });
      }
      if (event.metaKey && event.key === "3") {
        dispatch({
          type: "resources/changeResources",
          payload: { title: "pickles", value: 3500 },
        });
        dispatch({
          type: "stats/setStats",
          payload: { title: "totalProduction", value: 3500 },
        });
        dispatch({
          type: "log/addLog",
          payload: { line: "Cheat Activated! +3500 pickles", cycle: cycles },
        });
      }
      if (event.metaKey && event.key === "4") {
        dispatch({
          type: "resources/changeResources",
          payload: { title: "pickles", value: 60000 },
        });
        dispatch({
          type: "stats/setStats",
          payload: { title: "totalProduction", value: 60000 },
        });
        dispatch({
          type: "log/addLog",
          payload: { line: "Cheat Activated! +60,000 pickles", cycle: cycles },
        });
      }
      if (event.metaKey && event.key === "5") {
        dispatch({
          type: "resources/changeResources",
          payload: { title: "pickles", value: 8000000 },
        });
        dispatch({
          type: "stats/setStats",
          payload: { title: "totalProduction", value: 8000000 },
        });
        dispatch({
          type: "plants/addPercentageTo",
          payload: { title: "plantCount", value: 500 },
        });
        dispatch({
          type: "robots/addBot",
          payload: { title: "picker", value: 5 },
        });
        dispatch({
          type: "robots/addBot",
          payload: { title: "pickler", value: 5 },
        });
        dispatch({
          type: "log/addLog",
          payload: {
            line: "Cheat Activated! +8,000,000 pickles, x5 plants, +500 bots",
            cycle: cycles,
          },
        });
      }
      if (event.metaKey && event.key === "6") {
        dispatch({
          type: "resources/changeResources",
          payload: { title: "pickles", value: 900000000 },
        });
        dispatch({
          type: "stats/setStats",
          payload: { title: "totalProduction", value: 900000000 },
        });
        dispatch({
          type: "plants/addPercentageTo",
          payload: { title: "plantCount", value: 10000 },
        });
        dispatch({
          type: "robots/addBot",
          payload: { title: "picker", value: 5000 },
        });
        dispatch({
          type: "robots/addBot",
          payload: { title: "pickler", value: 5000 },
        });
        dispatch({
          type: "log/addLog",
          payload: {
            line: "Cheat Activated! +900,000,000 pickles, x10,000 plants, +5,000 bots",
            cycle: cycles,
          },
        });
      }
      if (event.metaKey && event.key === "7") {
        dispatch({
          type: "resources/changeResources",
          payload: { title: "pickles", value: 9000000000 },
        });
        dispatch({
          type: "stats/setStats",
          payload: { title: "totalProduction", value: 9000000000 },
        });
        dispatch({
          type: "plants/addPercentageTo",
          payload: { title: "plantCount", value: 10000 },
        });
        dispatch({
          type: "robots/addBot",
          payload: { title: "picker", value: 10000 },
        });
        dispatch({
          type: "robots/addBot",
          payload: { title: "pickler", value: 10000 },
        });
        dispatch({
          type: "log/addLog",
          payload: {
            line: "Cheat Activated! +9,000,000,000 pickles, x10,000 plants, +10,000 bots",
            cycle: cycles,
          },
        });
      }
    };

    // Add event listener when component mounts
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameSpeed]);

  return (
    <ThemeProvider theme={pickles}>
      <Box sx={{ flexGrow: 1, margin: 0 }}>
        <Grid
          container
          spacing={2}
          gap={2}
          maxWidth={"xl"}
          justifyContent={"space-between"}
          alignContent={"stretch"}
          marginBottom={2}
        >
          <Grid item xs={12} md={6} lg={6}>
            <Typography variant="h4">Robotic Pickle Farm</Typography>
          </Grid>
          {authorized && (
            <Grid item xs={12} md={6} lg={4}>
              <TotalGoal />
            </Grid>
          )}
        </Grid>

        {!authorized && (
          <Grid
            container
            rowSpacing={2}
            columnSpacing={2}
            justifyContent={"flex-start"}
            alignItems={"center"}
          >
            <Grid item sm={12} md={6} lg={6}>
              <AboutContent />
            </Grid>

            <Grid item sm={12} md={6} lg={6}>
              <LandingPage />
            </Grid>
          </Grid>
        )}
        {/* End !authorized && */}

        {authorized && (
          <Grid
            container
            rowSpacing={2}
            columnSpacing={2}
            justifyContent={"flex-start"}
            alignItems={"flex-start"}
          >
            <Grid item sm={12} md={3} lg={4}>
              <MainBoxLeft />
            </Grid>
            <Grid item sm={12} md={3} lg={4}>
              <MainBox />
            </Grid>
          </Grid>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
