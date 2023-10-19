import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import Button from '@mui/material/Button';

import SettingsWindow from './SettingsWindow';
import AboutWindow from './AboutWindow';

function GameMenu () {

    const [cookies, setCookie, removeCookie] = useCookies(['Email' , 'AuthToken']);
    const dispatch = useDispatch();

    const [settings, setSettings] = useState(false);
    const [about, setAbout] = useState(false);

    const userEmail = useSelector(store => store.userEmail);
    const userId = useSelector(store => store.userId);
    const cycles = useSelector(store => store.cycles);
    const resources = useSelector(store => store.resources);
    const prices = useSelector(store => store.prices);
    const log = useSelector(store => store.log);
    const plants = useSelector(store => store.plants);
    const plantSettings = useSelector(store => store.plantSettings);
    const robots = useSelector(store => store.robots);
    const upgrades = useSelector(store => store.upgrades);
    const stats = useSelector(store => store.stats);

    const handleSignOut = () => {
        dispatch({ type: 'SAVE_GAME' });
        removeCookie('Email');
        removeCookie('AuthToken');
        window.location.reload();
        }

    const saveGame = () => {
            dispatch({ type: 'SAVE_GAME'});
    }

    const handleSettings = () => {
        setSettings(!settings);
    }

    const handleAbout = () => {
        setAbout(!about);
    }

    // const sagaTest = () => {
    //     dispatch({ type: 'SAVE_GAME', payload: 'ooga booga' });
    // }

    return (
        <>
        {/* <Button onClick={sagaTest} color="primary">Testy Button</Button> */}
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