import {useState} from 'react';
import TipBox from './TipBox';

function UpgradeButton ({name, buttonCall, disable, show, data, item}) {
    const showButton = () => show ? 'unHidden' : 'hidden';
    const handleClick = () => {
        console.log(item);
        buttonCall(name, item);
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