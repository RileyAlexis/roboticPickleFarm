import {useState} from 'react';

function MainBox ({mainBoxMenuItems, engine}) {

const [disable, setDisable] = useState(false);
const [progress, setProgress] = useState(100);
const [display, setDisplay] = useState(false);
let grayOut = disable ? 'grayOut' : '';


    return (
        <>

        <button className={`main-box-btn ${engine.mainBoxMenu[0].dis ? 'grayOut': ''}`} disabled={engine.mainBoxMenu[0].dis} onClick={event => {
            engine.plantSeed();
        }}>
            {/* <progress id="determinate" value={100} min={0} max={100}>
            </progress> */}
            Plant Seed
            </button>
            

        <button className={`main-box-btn ${engine.mainBoxMenu[1].dis ? 'grayOut': ''}`} disabled={engine.mainBoxMenu[1].dis} onClick={event => {
            engine.pickCucumbers();
        }}>Pick Cucumber</button>

    
       
        
        {/* {mainBoxMenuItems.map((items) => {
            if (items.display) return (
                <button disabled={disable} key={items.name} className={`main-box-btn ${grayOut}`}
                onClick={event => {
                    items.onClick();
                    disableBtn();
                }}>
                    {items.name}</button>
            )
                else return (null);
            }
            
        )} */}
       
        </>
    

    )
}

export default MainBox;