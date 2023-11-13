import { Typography } from '@mui/material';

function About() {
    return (
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
    )
}

export default About;