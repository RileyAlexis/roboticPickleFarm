import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Switch, FormControlLabel } from "@mui/material";

function SettingsWindow({ onClose }) {

    const gameSpeed = useSelector(store => store.stats.gameSpeed);
    const [checked, setChecked] = useState(false);
    const dispatch = useDispatch();

    const setButton = () => {
        console.log(gameSpeed);
        if (gameSpeed === 1000) setChecked(false);
        else setChecked(true);
    }

    useEffect(() => {
        setButton();
        }, []);

    const handleChange = () => {
        console.log('handleChange', checked);
        if (!checked) {
        dispatch({ type: 'stats/changeStat', payload: { title: 'gameSpeed', value: 500 }});
        setChecked(true);
        } else if (checked) {
            dispatch({ type: 'stats/changeStat', payload: { title: 'gameSpeed', value: 1000 }})
            setChecked(false);
        }
        console.log(gameSpeed);
    }

    return (
        <> 
        <div className="overlay">
            </div>
        <div className="settingsWindow">
            <div className="settingsWindowText">
            <Typography variant="h6">Settings</Typography>
            <button onClick={onClose}>X</button>
            <br /><br />
            <FormControlLabel control={ <Switch
                              color="secondary"
                              checked={checked}
                              onChange={handleChange}
                />}
                label="x2 GameSpeed"
                labelPlacement="start"
                />


           

            </div>
        </div>
        </>
    )
}

export default SettingsWindow;