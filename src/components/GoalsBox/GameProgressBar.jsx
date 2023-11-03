import './GameProgress.css';

function GameProgressBar({ filled, empty }) {
    return (
        <div className="totalContainer">
            <div className="progress-left">{filled}%</div>
            <div className="progress-container">
                <div className="progress-filled" style={{ width: `${filled}%` }}></div>
                <div className="progress-empty" style={{ width: `${empty}%` }}></div>
            </div>
        </div>
    )
}

export default GameProgressBar;