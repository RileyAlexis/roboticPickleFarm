import { useSelector } from "react-redux";

function Resources () {

    const resources = useSelector(store => store.resources);

    return (
        <>
        <h3>Resources:</h3>
        {console.log('Resources listing', resources)}
        {Object.keys(resources).map(key => {
            if (resources[key] > 0)
            return (
                <li key={key}>{key}:{resources[key]}</li>
            )
            else return (null);
        })}
        </>
    )
}

export default Resources;