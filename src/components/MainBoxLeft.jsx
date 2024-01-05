import { Typography, Grid, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import {
  countDigits,
  formatNumber,
  formatToBillion,
} from "../modules/utilFunction";

import RobotData from "./RobotData";
import Resources from "./Resources";
import PlantsList from "./PlantsList";

function MainBoxLeft() {
  const stats = useSelector((store) => store.stats);

  return (
    <Grid container item justifyContent={"flex-start"}>
      <Paper>
        <Grid item>
          <Typography
            variant="h6"
            sx={{
              mt: "15px",
              mb: "15px",
              fontWeight: 300,
            }}
          >
            Total Production: {formatNumber(stats.totalProduction)}
          </Typography>
        </Grid>
        <Resources />
        <PlantsList />
        <RobotData />
      </Paper>
    </Grid>
  );
}

export default MainBoxLeft;
