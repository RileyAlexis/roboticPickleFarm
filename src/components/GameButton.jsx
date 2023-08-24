import {useState} from 'react';

function GameButton ({name, buttonCall, disable, show, coolDown}) {
    const [disableBtn, setDisableBtn] = useState(disable);
    const showButton = () => show ? 'unHidden' : 'hidden';
    const handleClick = () => {
        buttonCall(name);
    }

    return (
        
        <button className={`main-box-btn ${showButton}`} 
                onClick={handleClick} disabled={disableBtn}>{name}</button>

    )
}

export default GameButton;