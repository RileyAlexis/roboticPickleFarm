import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import swal from 'sweetalert';
import { Typography, Switch, FormControlLabel, Button, Slider } from "@mui/material";
import TipBox from '../TipBox';

import './SettingsWindow.css';

function SettingsWindow({ onClose }) {

    const gameSpeed = useSelector(store => store.stats.gameSpeed);
    const timeframe = useSelector(store => store.stats.timeframe);
    const autoSaveInterval = useSelector(store => store.stats.autoSaveInterval);
    const [checked, setChecked] = useState(false);
    const dispatch = useDispatch();

    const setButton = () => {
        if (gameSpeed === 1000) setChecked(false);
        else setChecked(true);
    }

    useEffect(() => {
        setButton();
        }, []);

    const handleChange = () => {
        console.log('handleChange', checked);
        if (!checked) {
        dispatch({ type: 'stats/setStat', payload: { title: 'gameSpeed', value: 500 }});
        setChecked(true);
        } else if (checked) {
            dispatch({ type: 'stats/setStat', payload: { title: 'gameSpeed', value: 1000 }})
            setChecked(false);
        }
        console.log(gameSpeed);
    }

    const newGame = () => {
        swal({
            title: "Confirm delete game",
            text: "This will erase your current game forever and cannot be undone!",
            icon: "warning",
            dangerMode: true,
            buttons: true,
            closeOnClickOutside: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                dispatch({type: 'START_NEW_GAME'});
            } 
        })
    }

const setStatsInterval = (e) => {
    dispatch({ type: 'stats/setStat', payload: { title: 'timeframe', value: e.target.value }})
    console.log(timeframe);
}

const setAutoSaveInterval = (e) => {
    dispatch({ type: 'stats/setStat', payload: { title: 'autoSaveInterval', value: e.target.value }})
}

const intervalMarks = [
    {value: 30, label: '30s'},
    {value: 60, label: '60s'},
    {value: 120, label: '120s'},
    {value: 240, label: '240s'},
]

const autosaveMarks = [
    {value: 60, label: '1 min'},
    {value: 120, label: '2 min'},
    {value: 240, label: '4 min'},
    {value: 480, label: '8 min'},
]

    return (
        <> 
        <div className="overlay">
            </div>
        <div className="settingsWindow">
            <div className="settingsWindowText">
            <Typography variant="h6">Settings</Typography>
            <button id="closeBtn" onClick={onClose}>X</button>
            <br /><br />
        <div className="settingsButtonContainer">
            <div className="singleSetting">
                <TipBox data="Game will update twice per second when checked">
                    <Typography variant="body">X2 Game Speed</Typography>
                </TipBox>
                    <Switch
                    color="secondary"
                    checked={checked}
                    onChange={handleChange}
                    />
                
            </div>
            <div className="singleSetting">
            <TipBox data="Timeframe used to calculate the +/- showing to the right of each resource">
                    <Typography sx={{marginLeft: '15px'}}
                        variant="body">Stats Interval</Typography>
                </TipBox>
                 <Slider
                    sx={{ width: '80%', padding: '10px', margin: '15px' }}
                    color="secondary"
                    size="small"
                    marks={intervalMarks}
                    step={null}
                    value={timeframe}
                    min={intervalMarks[0].value}
                    max={intervalMarks[intervalMarks.length-1].value}
                    onChange={setStatsInterval}
                />
            </div>
            <div className="singleSetting">
            <TipBox data="Game will auto save at these intervals">
                    <Typography sx={{marginLeft: '15px'}}
                        variant="body">Auto Save Interval</Typography>
                </TipBox>
                 <Slider
                    sx={{ width: '80%', padding: '10px', margin: '15px' }}
                    color="secondary"
                    size="small"
                    marks={autosaveMarks}
                    step={null}
                    value={autoSaveInterval}
                    min={autosaveMarks[0].value}
                    max={autosaveMarks[autosaveMarks.length-1].value}
                    onChange={setAutoSaveInterval}
                />
            </div>
                                    
               <div className="singleSetting">
                <TipBox data="Erase all current progress and start a new game">
            <Button variant="outlined" onClick={newGame}>Start New Game</Button>
            </TipBox>
            </div> 
            


           
                </div>
            </div>
        </div>
        </>
    )
}

export default SettingsWindow;