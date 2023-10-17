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
            </div>
        </div>
        </>
    )
}

export default AboutWindow;