import { Typography } from "@mui/material";

function AboutWindow({onClose}) {
    return (
        <> 
        <div className="overlay">
            </div>
        <div className="settingsWindow">
            <div className="settingsWindowText">
            <Typography variant="h6">About Robotic Pickle Farm</Typography>
            <button onClick={onClose}>X</button>
            <br />
            <Typography variant="body">Robotic Pickle Farm is an incremental game created by Riley Alexis as her first web dev project. The game is in the spirit of Universal Paperclips, A Dark Room or Kittens Game. It involves an iterative game style where a player's goal is to make as many pickles as possible. The eventual goal is to produce 2.8 trillion pickles, roughly equal to the annual global output of planet Earth.</Typography>
            </div>
        </div>
        </>
    )
}

export default AboutWindow;