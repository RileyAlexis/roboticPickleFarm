
import BuildingsButton from "../BuildingsButton/BuildingsButton";
import { buttonCall } from "../../modules/buttons";

function BuildingsBuyer({buildings}) {

    return (
        <>
        {buildings?.map((item) => 
            item.show &&
            <div key={item.name}>
            <div className="buttonBox">
                    <BuildingsButton 
                        name={item.name} 
                        buttonCall={() => buttonCall('buyBuilding', item)} 
                        disable={item.disabled}
                        show={item.show}
                        data={item.data}
                        item={item}
                        coolDown={item.coolDown} />
            </div>
            </div>
            )}
            </>
    )
        }

export default BuildingsBuyer;