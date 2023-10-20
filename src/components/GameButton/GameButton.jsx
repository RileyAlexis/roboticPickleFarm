import TipBox from '../TipBox';
import './GameButton.css';

function GameButton ({name, buttonCall, disable, show, data, coolDown}) {
    const handleClick = () => {
        buttonCall(name);
    }

    return (
        <>
        {(data !== '') ? (
            <div key={name} className='roll-out'>
        <TipBox data={data}>
        <button className={`gameButton-btn` } 
                onClick={handleClick} disabled={disable}>{name}</button>
        </TipBox>
        </div>
        ) : 
        (
            <div key={name} className='roll-out'>
            <button className={`gameButton-btn`} 
                onClick={handleClick} disabled={disable}>{name}</button>
                </div>
        )
    }
    </>
    )
}

export default GameButton;