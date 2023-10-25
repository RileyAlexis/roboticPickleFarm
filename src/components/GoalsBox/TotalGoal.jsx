import { useSelector } from "react-redux";
import { calculatePercentage, formatNumber } from "../../modules/utilFunction";
import GameProgressBar from "./GameProgressBar";
import { Typography } from "@mui/material";
import './TotalGoal.css';

function TotalGoal() {
    const totalGoal = useSelector(store => store.stats.totalGoal);
    const totalProduction = useSelector(store => store.stats.totalProduction);
    const totalGrowthRate = useSelector(store => store.stats.totalGrowthRate);

const calcSeconds = () => {
    let years = ((totalGoal - totalProduction) / totalGrowthRate) / (86400 / 364.25);
    return parseFloat(years).toFixed(2);
}


const yearsUntilGoal = formatNumber(calcSeconds());
// const filled = parseFloat(totalProduction / totalGoal).toFixed(8);
const filled = calculatePercentage(totalProduction, totalGoal)
// const filled = totalProduction / totalGoal;
const empty = 100 - filled;

    return (
        <div className="goalBox">
            <div className="totalGoal-display">
                <Typography variant="body">Goal: {formatNumber(totalGoal)}</Typography>
                </div>
            <GameProgressBar filled={filled} empty={empty} totalGoal={totalGoal}/>
            <div className="yearsGoal-display">
            <Typography variant="caption">Years until Goal: {yearsUntilGoal} </Typography>
            </div>

        </div>
    )
}

export default TotalGoal;