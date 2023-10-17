import {useState} from 'react';
import TipBox from './TipBox';

function GameButton ({name, buttonCall, disable, show, data, coolDown}) {
    const showButton = () => show ? 'unHidden' : 'hidden';
    const handleClick = () => {
        buttonCall(name);
    }

    return (
        <>
        {(data !== '') ? (
            <>
        <TipBox data={data}>
        <button className={`main-box-btn ${showButton}`} 
                onClick={handleClick} disabled={disable}>{name}</button>
        </TipBox>
        </>
        ) : 
        (
            <>
            <button className={`main-box-btn ${showButton}`} 
                onClick={handleClick} disabled={disable}>{name}</button>
                </>
        )
    }
    </>
    )
}

export default GameButton;