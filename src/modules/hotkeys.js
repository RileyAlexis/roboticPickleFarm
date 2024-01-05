export const handleKeyDown = (event) => {
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

