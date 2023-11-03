import { useSelector } from "react-redux";

import { calculatePercentage, formatNumber } from "../../modules/utilFunction";
import GameProgressBar from "./GameProgressBar";

import { Typography } from "@mui/material";
import './TotalGoal.css';

function TotalGoal() {
    const totalGoal = useSelector(store => store.stats.totalGoal);
    const totalProduction = useSelector(store => store.stats.totalProduction);
    const totalGrowthRate = useSelector(store => store.stats.totalGrowthRate);
    const trillion = useSelector(store => store.stats.trillion);

    const calcSeconds = () => {
        let years = (((totalGoal * trillion) - totalProduction.value) / totalGrowthRate.value) / (86400 / 364.25);
        return parseFloat(years).toFixed(2);
    }


    const yearsUntilGoal = formatNumber(calcSeconds());
    const filled = calculatePercentage(totalProduction.value, (totalGoal * trillion))
    const empty = 100 - filled;

    return (
        <div className="goalBox">
            <div className="totalGoal-display">
                <Typography variant="body">Goal: {formatNumber((totalGoal * trillion))}</Typography>
            </div>
            <GameProgressBar filled={filled} empty={empty} />
            <div className="yearsGoal-display">
                <Typography variant="caption">Years until Goal: {yearsUntilGoal} </Typography>
            </div>

        </div>
    )
}

export default TotalGoal;