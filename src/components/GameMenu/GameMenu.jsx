import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import './GameMenu.css';

import SettingsWindow from '../Settings/SettingsWindow'
import AboutWindow from '../AboutWindow';

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
        <div class="col-md-6">
            <button type="button" class="bot-btn btn btn-outline-primary btn-sm" onClick={saveGame}>Save</button>
            <button type="button" class="bot-btn btn btn-outline-primary btn-sm" onClick={handleSettings}>Settings</button>
            <button type="button" class="bot-btn btn btn-outline-primary btn-sm" onClick={handleAbout}>About</button>
            <button type="button" class="bot-btn btn btn-outline-primary btn-sm" onClick={handleSignOut}>Sign Out</button>
            {settings && <SettingsWindow onClose={handleSettings} />}
            {about && <AboutWindow onClose={handleAbout} />}
        </div>
        <div class="col-sm-12">
            <div class="dropdown">
                <button type="button" class="btn btn-outline-primary btn-sm" data-bs-toggle="dropdown" aria-expanded="false">
                    
                </button>
            </div>

        </div>
        </> 
    )
}

export default GameMenu;