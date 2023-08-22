function LogBox({log}) {

    let revArr = log.toReversed();

    return (
        <div className="log-box">
            {revArr.map((line, index) => <p key={index}>{line}</p>)}
        </div>
    )
}

export default LogBox;
