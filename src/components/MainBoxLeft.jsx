import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { formatNumber } from "../modules/utilFunction";

import RobotData from "./RobotData";
import Resources from "./Resources";
import PlantsList from "./PlantsList";

function MainBoxLeft() {
    const stats = useSelector(store => store.stats);

    return (
        <div className="mainBoxLeft">
            <div className="totalProduction">
                <Typography variant="h6" sx={{
                    mt: '15px',
                    mb: '15px',
                    fontWeight: 300
                }}>Total Production: {formatNumber(stats.totalProduction)}</Typography>
            </div>
            <Resources />
            <PlantsList />
            <RobotData />

        </div>
    )
}

export default MainBoxLeft;