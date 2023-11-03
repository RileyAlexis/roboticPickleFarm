import TipBox from '../TipBox';
import './UpgradeButton.css';

function UpgradeButton({ name, buttonCall, disable, data, item }) {
    const handleClick = () => {
        buttonCall(name, item);
    }
    //data prop controls tooltip display - ternary = if no data then no tooltip(otherwise a blank tooltip will show)
    return (
        <>
            {(data !== '') ? (
                <div key={name} className='roll-out'>
                    <TipBox data={data}>
                        <button className={`gameButton-btn`}
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

export default UpgradeButton;