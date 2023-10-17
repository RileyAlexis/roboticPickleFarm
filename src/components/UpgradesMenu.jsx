import { useSelector } from "react-redux";
import UpgradeButton from "./UpgradeButton";
import { buttonCall } from '../modules/buttons';

function UpgradeMenu() {
    const upgradeMenu = useSelector(store => store.upgrades);

    return (
        <div className="buttonBox">
        {upgradeMenu?.map((item) => 
            {if (item.show) return (
                    <UpgradeButton key={item.name} 
                        name={item.name} 
                        buttonCall={() => buttonCall('upgrade', item.name, item.dispatch)} 
                        disable={item.disabled}
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

export default UpgradeMenu;