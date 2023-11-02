import react from 'react';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import axios from 'axios';

//Material UI Components
import { Button, FormControlLabel, FormGroup, Typography, Checkbox } from '@mui/material';
import { TextField } from '@mui/material';

import { checkBuildings, checkButtons, checkTabs, checkUpgrades } from '../../modules/events'
import './landingPage.css';

function LandingPage() {

    const [login, setLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [guideChecked, setGuideChecked] = useState(true);
    const [cookies, setCookie, removeCookie] = useCookies(['Email', 'AuthToken']);

    const dispatch = useDispatch();
    const genId = v4();
    const authorized = useSelector(store => store.authorized);
    // const store = useSelector(store => store);

    const initializeGame = () => {
        if (!authorized) {
            dispatch({ type: 'SET_AUTH', payload: true });
            dispatch({ type: 'SET_USERID', payload: genId });
            dispatch({ type: 'RUN_ENGINE'});
        }
    }

    const processLogin = () => {

        const dataObj = {
            email: email,
            password: password
        }

        axios.post('/game/login', dataObj)
            .then((response) => {
                if (response.data.detail) {
                    setError(response.data.detail);
                    return;
                } else if (!response.data.detail) {
                    setCookie('Email', response.data.email);
                    setCookie('AuthToken', response.data.token);
                    dispatch({ type: 'SET_EMAIL', payload: response.data.email });
                    dispatch({ type: 'SET_USERID', payload: response.data.userId })
                    dispatch({ type: 'SET_AUTH', payload: true });

                    const data = {
                        userId: response.data.userId
                    }

                    axios.post('/game/loadgame', {
                        headers: { 'Authorization': `${response.data.token}` },
                        data
                    })
                        .then((response) => {
                            //Set game data Here
                            dispatch({ type: 'log/setAllLog', payload: response.data.log });
                            dispatch({ type: 'stats/setAllStats', payload: response.data.stats });
                            dispatch({ type: 'resources/setAllResources', payload: response.data.resources });
                            dispatch({ type: 'robots/setAllBots', payload: response.data.robots });
                            dispatch({ type: 'upgrades/setAllUpgrades', payload: response.data.upgrades })
                            dispatch({ type: 'buildings/setAllBuildings', payload: response.data.buildings })
                            dispatch({ type: 'prices/setAllPrices', payload: response.data.prices });
                            dispatch({ type: 'plants/setAllPlants', payload: response.data.plants });
                            checkButtons();
                            checkTabs();
                            checkUpgrades();
                            checkBuildings();
                        }).catch((error) => {
                            console.log(error);
                        })
                }
            })
    }

    const createNewUser = () => {
        console.log(email.length);
        if (email.length < 5) { setError('User Email must be at least 5 characters'); return; }
        if (password !== confirmPassword || password === '') {
            setError('Passwords do not match');
            return;
        } else if (password === confirmPassword) {
            const dataObj = {
                email: email,
                password: password,
            }
            axios.post('/game/newUser', dataObj)
                .then((response) => {
                    if (response.data.detail) {
                        setError(response.data.detail)
                    } else {
                        setCookie('Email', response.data.email);
                        setCookie('AuthToken', response.data.token);
                        dispatch({ type: 'SET_EMAIL', payload: response.data.email });
                        dispatch({ type: 'SET_USERID', payload: response.data.userId });
                        dispatch({ type: 'SET_AUTH', payload: true });
                        dispatch({ type: 'RUN_ENGINE'});
                        dispatch({ type: 'stats/toggleActive', payload: { title: 'playGuide' }})

                    }
                })
        }
    }

    const playGuide = (e) => {
        setGuideChecked(e.target.checked);
        dispatch({ type: 'stats/toggleActive', payload: { title: 'playGuide' }})
    }

    return (
        <div className="landingPage">
            {login &&
                <div className="loginBox">
                    <Typography variant="body">
                        Login, sign up or click "New Game" without logging in.
                    </Typography>
                    <br /> <br /><br />
                    <TextField variant="filled" label="Email" required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField variant='filled' label="Password" required
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br /> <br /><br />
                    <div className="buttonBox" >
                        <Button variant='outlined' onClick={processLogin}>Log In</Button>
                        <Button variant='outlined' onClick={(e) => setLogin(!login)}>New User</Button>
                        <Button variant='outlined' onClick={initializeGame}>New Game</Button>
                    </div>
                    {error && <Typography m={2} color="red" variant='body'>{error}</Typography>}
                    <br />
                    <Typography variant='caption'>
                        If no login is provided game data will not be saved(local storage not implemented yet)
                    </Typography>
                </div>
            }

            {!login &&
                <div className="loginBox">
                    <Typography variant="body">
                        Enter email address and create a password:
                    </Typography>
                    <br /> <br /><br />
                    <TextField variant="filled" label="Email" required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField variant='filled' label="Password" required
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField variant='filled' label="Confirm Password" required
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <br />
                    {/* <FormGroup variant="standard">
                        <FormControlLabel
                        sx={{
                            marginLeft: '25px',
                            marginTop: '20px'
                        }}
                        control={
                    <Checkbox 
                        checked={guideChecked} onChange={playGuide} color="primary" />
                        }
                        label="Show Player Guide on game start" />
                             
                        
                    </FormGroup> */}
                    <br /> <br /><br />
                    <div className="buttonBox" >
                        <Button variant='outlined' onClick={createNewUser}>Create New User</Button>
                        <Button variant='outlined' onClick={(e) => setLogin(!login)}>Back</Button>
                    </div>
                    {error && <Typography m={2} color="red" variant='body'>{error}</Typography>}
                </div>
            }


        </div>
    )
}

export default LandingPage;