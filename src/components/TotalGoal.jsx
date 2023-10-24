import { useSelector } from "react-redux";
import { formatNumber } from "../modules/utilFunction";

function TotalGoal() {
    const totalGoal = useSelector(store => store.stats.totalGoal);
    const totalProduction = useSelector(store => store.stats.totalProduction);
    const totalGrowthRate = useSelector(store => store.stats.totalGrowthRate);

const calcSeconds = () => {
    let years = (totalGoal / totalGrowthRate) / (86400 / 364.25);
    return parseFloat(years).toFixed(2);
}

const yearsUntilGoal = formatNumber(calcSeconds());


    return (
        <div className="goalBox">
            {formatNumber(totalProduction)} of {formatNumber(totalGoal)} <br />
            {/* {formatNumber(totalProduction / totalGoal)} % Complete <br /> */}
            Years until Goal: {yearsUntilGoal}


        </div>
    )
}

export default TotalGoal;