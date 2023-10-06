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
    const pickerBots = useSelector(store => store.pickerBots);
    const planterBots = useSelector(store => store.planterBots);
    const picklerBots = useSelector(store => store.picklerBots);
    const upgrades = useSelector(store => store.upgrades);

    const handleSignOut = () => {
        removeCookie('Email');
        removeCookie('AuthToken');
        window.location.reload();
    }

    const saveGame = () => {
        if (cookies.AuthToken) {
                const dataObj = {
                    userEmail: userEmail,
                    userId: userId,
                    cycles: cycles,
                    resources: resources,
                    prices: prices,
                    log: log,
                    plants: plants,
                    pickerBots: pickerBots,
                    planterBots: planterBots,
                    picklerBots: picklerBots,
                    upgrades: upgrades
                }
                axios.post('/game/savegame', { headers: { 'Authorization': `Bearer ${cookies.AuthToken}`},
                    dataObj})
                    .then((response) => {
                        dispatch({type: 'ADD_LOG', payload: `Game Saved at Cycle ${cycles}`});
                    }).catch((error) => {
                        console.error(error);
                    })
 
        }
    }

    const testRoute = () => {
        const dataObj = {
            userEmail: userEmail
        }

        axios.post('/game/testingRoute', {headers: { 'Authorization': `${cookies.AuthToken}`}, dataObj})
            .then((response) => {
                console.log(response);
            }).catch((error) => {
                console.error(error);
            })
    }

    return (
        <>
        <Button onClick={testRoute} color="primary">Testing Route</Button>
        <Button onClick={saveGame} color="primary">Save</Button>
        <Button color="primary">Settings</Button>
        <Button onClick={handleSignOut} color="primary">Sign Out</Button>
        </>
    )
}

export default GameMenu;