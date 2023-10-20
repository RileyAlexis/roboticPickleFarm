import TipBox from '../TipBox';
import './UpgradeButton.css';

function UpgradeButton ({name, buttonCall, disable, show, data, item}) {
    const showButton = () => show ? 'unHidden' : 'hidden';
    const handleClick = () => {
        console.log(item);
        buttonCall(name, item);
    }

    return (
        <>
        {(data !== '') ? (
            <div key={name} className='roll-out'>
        <TipBox data={data}>
        <button className={`main-box-btn ${showButton}`} 
                onClick={handleClick} disabled={disable}>{name}</button>
        </TipBox>
        </div>
        ) : 
        (
            <div key={name} className='roll-out'>
            <button className={`main-box-btn ${showButton}`} 
                onClick={handleClick} disabled={disable}>{name}</button>
                </div>
        )
    }
    </>
    )
}

export default UpgradeButton;