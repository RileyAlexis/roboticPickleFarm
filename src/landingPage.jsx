import react from 'react';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

//Material UI Components
import { Button, Typography } from '@mui/material';
import { TextField } from '@mui/material';

function LandingPage() {

    const [login, setLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [gameId, setGameId] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies(['Email' , 'AuthToken']);
    const dispatch = useDispatch();

    const initializeGame = () => {
    
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
                    dispatch({ type: 'SET_USERID', payload: response.data.email });
                    dispatch({ type: 'SET_AUTH', payload: true });
                }
            })
    }

    const createNewUser = () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        } else if (password === confirmPassword) {
            const dataObj = {
                email: email,
                password: password,
                gameId: gameId
            }
            axios.post('/game/newUser', dataObj)
                .then((response) => {
                    if (response.data.detail) {
                        setError(response.data.detail)
                    } else {
                        console.log(response.data.email);
                        setCookie('Email', response.data.email);
                        setCookie('AuthToken', response.data.token);
                        dispatch({ type: 'SET_USERID', payload: response.data.email });
                        dispatch({ type: 'SET_AUTH', payload: true });
                        dispatch({ type: 'SET_GAMEID', payload: gameId })
                    }
                })
        }
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
                <Button variant='outlined' onClick={(e) => setLogin(!login)}>New User</Button>
                <Button variant='outlined' onClick={processLogin}>Log In</Button>
                <Button variant='outlined' onClick={initializeGame}>New Game</Button>
                </div>
                {error && <Typography m={2} color="red" variant='body'>{error}</Typography>}
                <br />
                <Typography variant='caption'>
                   If no login is provided game data will only be stored locally
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