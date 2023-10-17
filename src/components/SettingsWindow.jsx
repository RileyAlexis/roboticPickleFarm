import { Typography } from "@mui/material";

function SettingsWindow({ onClose }) {
    return (
        <> 
        <div className="overlay">
            </div>
        <div className="settingsWindow">
            <div className="settingsWindowText">
            <Typography variant="h6">Settings</Typography>
            <button onClick={onClose}>X</button>
            </div>
        </div>
        </>
    )
}

export default SettingsWindow;