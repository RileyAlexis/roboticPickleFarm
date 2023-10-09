import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';

import Button from '@mui/material/Button';

function GameMenu () {

    const [cookies, setCookie, removeCookie] = useCookies(['Email' , 'AuthToken']);
    const dispatch = useDispatch();

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
        saveGame();
        removeCookie('Email');
        removeCookie('AuthToken');
        window.location.reload();
    }

    const saveGame = () => {
            const dataObj = {
                userId: userId,
                resources: resources,
                prices: prices,
                log: log,
                plants: plants,
                robots: robots,
                upgrades: upgrades,
                stats: stats,
                plantSettings: plantSettings
            }

    axios.post('/game/savegame', {headers: { 'Authorization': `${cookies.AuthToken}`},
        dataObj})
        .then((response) => {
            dispatch({type: 'log/addLog', payload: {line: `Game Saved Successfully`, cycle: cycles}});
        }).catch((error) => {
            console.error(error);
        })
    }

    return (
        <>

        <Button onClick={saveGame} color="primary">Save</Button>
        <Button color="primary">Settings</Button>
        <Button onClick={handleSignOut} color="primary">Sign Out</Button>
        </>
    )
}

export default GameMenu;