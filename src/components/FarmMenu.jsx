import { useSelector } from "react-redux";
import GameButton from "./GameButton";
import { buttonCall } from "../modules/engine";

function FarmMenu() {
    const farmMenu = useSelector(store => store.farmMenu);

    console.log('ButtonCall', buttonCall)
    return (
        <div className="buttonBox">
        {farmMenu?.map((item) => 
            {if (item.show) return (
                    <GameButton key={item.name} 
                        name={item.name} 
                        buttonCall={() => buttonCall(item.name)} 
                        disable={item.dis}
                        show={item.show}
                        coolDown={item.coolDown} />
            )
            else return (null)
            }
        )}
       
    </div>
    )
}

export default FarmMenu;