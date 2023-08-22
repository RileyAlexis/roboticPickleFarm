function Resources ({resources}) {

    return (
        <>
        <h3>Resources:</h3>
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