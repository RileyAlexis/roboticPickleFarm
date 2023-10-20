import { useSelector } from "react-redux";
import GameButton from "./GameButton/GameButton";
import { buttonCall } from "../modules/buttons";

function RobotMenu() {
    const robotMenu = useSelector(store => store.robotMenu);

    return (
        <div className="buttonBox">
        {robotMenu?.map((item) => 
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

export default RobotMenu;