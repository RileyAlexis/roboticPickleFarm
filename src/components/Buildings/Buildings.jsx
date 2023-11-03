import { useSelector } from "react-redux";
import { buttonCall } from '../../modules/buttons';

import './Buildings.css';
import BuildingsButton from '../BuildingsButton/BuildingsButton';
import BuildingsAccordion from '../Buildings/BuildingsAccordion';

function Buildings() {
    const buildings = useSelector(store => store.buildings);

    return (
        <div className="buidlingsContainer">
            {buildings.map((item) => (
                <>

                    {item.show && !item.purchased &&

                        <div className="buyButtonsBox" key={item.name}>
                            <BuildingsButton
                                name={item.name}
                                buttonCall={() => buttonCall('buyBuilding', item)}
                                disable={item.disabled}
                                show={item.show}
                                data={item.data}
                                item={item}
                                coolDown={item.coolDown} />
                        </div>
                    }

                    {item.purchased &&
                        <div className="accordionBox">
                            <BuildingsAccordion building={item} />
                        </div>
                    }
                </>


            ))}

        </div>
    )
}

export default Buildings;