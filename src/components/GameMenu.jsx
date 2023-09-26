import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';

import Button from '@mui/material/Button';

function GameMenu () {

    const [cookies, setCookie, removeCookie] = useCookies(['Email' , 'AuthToken']);
    const dispatch = useDispatch();

    const handleSignOut = () => {
        removeCookie('Email');
        removeCookie('AuthToken');
        window.location.reload();
    }

    return (
        <>
        <Button color="primary">Save</Button>
        <Button color="primary">Settings</Button>
        <Button onClick={handleSignOut} color="primary">Sign Out</Button>
        </>
    )
}

export default GameMenu;