import { useDispatch } from "react-redux";
import BuildingsAccordion from "./BuildingsAccordion";

function BuildingsControl({buildings}) {

    const dispatch = useDispatch();

    const handleChange = (name) => (event) => {
        dispatch({ type: 'buildings/toggleExpander', payload: name });
    }
    console.log(buildings);
    return (
        <div className="building-active-options">
            {buildings.map((building) => {
                
                if (building.purchased) {
                    {console.log(building.purchased)}
                    <BuildingsAccordion building={building} />
                } //End if
                })
            }
        </div>
    )
}

export default BuildingsControl;