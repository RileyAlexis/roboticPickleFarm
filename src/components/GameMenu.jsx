import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import Button from '@mui/material/Button';

import SettingsWindow from './Settings/SettingsWindow'
import AboutWindow from './AboutWindow';

function GameMenu() {

    const [cookies, setCookie, removeCookie] = useCookies(['Email', 'AuthToken']);
    const dispatch = useDispatch();

    const [settings, setSettings] = useState(false);
    const [about, setAbout] = useState(false);

    const handleSignOut = () => {
        dispatch({ type: 'SAVE_GAME' });
        removeCookie('Email');
        removeCookie('AuthToken');
        dispatch({ type: 'RESET_ENTIRE_STORE' });
    }

    const saveGame = () => {
        dispatch({ type: 'SAVE_GAME' });
    }

    const handleSettings = () => {
        setSettings(!settings);
    }

    const handleAbout = () => {
        setAbout(!about);
    }

    return (
        <>
            <Button onClick={saveGame} color="primary">Save</Button>
            <Button onClick={handleSettings} color="primary">Settings</Button>
            <Button onClick={handleAbout} color="primary">About</Button>
            <Button onClick={handleSignOut} color="primary">Sign Out</Button>

            {settings && <SettingsWindow onClose={handleSettings} />}
            {about && <AboutWindow onClose={handleAbout} />}
        </>
    )
}

export default GameMenu;