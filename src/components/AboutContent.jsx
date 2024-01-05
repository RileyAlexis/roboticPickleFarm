import { Typography, Paper } from "@mui/material";

function AboutContent() {
  return (
    <Paper elevation={3}>
      <Typography variant="h6">About Robotic Pickle Farm</Typography>

      <Typography variant="body">
        Robotic Pickle Farm is an incremental/clicker game created by Riley
        Alexis as her first web dev project. The game is in the spirit of
        Universal Paperclips, A Dark Room or Kittens Game. It involves an
        iterative game style where a player's goal is to make as many pickles as
        possible. The eventual goal is to produce 2.8 trillion pickles, roughly
        equal to the annual global output of planet Earth.
      </Typography>
      <br />
      <br />
      <br />
      <Typography variant="body">
        Robotic Pickle Farm is created using React, Redux, Redux-Saga, Node,
        Express and Postgres. User sessions handled by JSON Web Token and
        Bcrypt.
      </Typography>
      <br />
      <br />
      <br />
      <br />
      <Typography variant="caption">
        Source Code:{" "}
        <a href="https://github.com/RileyAlexis/roboticPickleFarm">
          GitHub: Robotic Pickle Farm
        </a>
      </Typography>
    </Paper>
  );
}

export default AboutContent;
