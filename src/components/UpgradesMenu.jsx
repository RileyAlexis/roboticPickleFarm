import { useSelector } from "react-redux";
import UpgradeButton from "./UpgradeButton/UpgradeButton";
import { buttonCall } from '../modules/buttons';

function UpgradeMenu() {
    const upgradeMenu = useSelector(store => store.upgrades);

    return (
        <div className="buttonBox">
        {upgradeMenu?.map((item) => 
            {if (item.show) return (
                    <UpgradeButton key={item.name} 
                        name={item.name} 
                        buttonCall={() => buttonCall('upgrade', item)} 
                        disable={item.disabled}
                        show={item.show}
                        data={item.data}
                        item={item}
                        coolDown={item.coolDown} />
            )
            else return (null)
            }
        )}
       
    </div>
    )
}

export default UpgradeMenu;