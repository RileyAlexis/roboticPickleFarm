import {useState} from 'react';
import TipBox from './TipBox';

function UpgradeButton ({name, buttonCall, disable, show, data, upgrade, dispatch}) {
    const showButton = () => show ? 'unHidden' : 'hidden';
    const handleClick = () => {
        buttonCall(name, upgrade, dispatch);
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

export default UpgradeButton;