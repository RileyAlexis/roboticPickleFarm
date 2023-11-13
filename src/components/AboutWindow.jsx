import { Typography } from "@mui/material";
import About from "./About";

function AboutWindow({ onClose }) {
    return (
        <>
            <div className="overlay">
            </div>
            <div className="settingsWindow">
                <div className="settingsWindowText">
                    <About />

                </div>
            </div>
        </>
    )
}

export default AboutWindow;