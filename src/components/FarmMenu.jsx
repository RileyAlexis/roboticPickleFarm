import { useSelector } from "react-redux";
import GameButton from "./GameButton/GameButton";
import { buttonCall } from '../modules/buttons';

function FarmMenu() {
    const farmMenu = useSelector(store => store.farmMenu);
    return (
        <div className="buttonBox">
        {farmMenu?.map((item) => 
            {if (item.show) return (
                
                    <GameButton key={item.name} 
                        name={item.name} 
                        buttonCall={() => buttonCall(item.name)} 
                        disable={item.dis}
                        show={item.show}
                        data={item.data}
                        coolDown={item.coolDown} />
                    
            )
            else return (null)
            }
        )}
       
    </div>
    )
}

export default FarmMenu;