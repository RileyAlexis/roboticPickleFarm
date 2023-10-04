import { useSelector } from "react-redux";

import { List, ListItem, ListItemText } from "@mui/material";

function LogBox() {
    const log = useSelector(store => store.log);
    let revArr = log.toReversed();

    return (
        <div className="log-box">
            <List dense={true}>
            
            {revArr.map((line, index) => 
            <ListItem key={index}>
                <ListItemText primary={line}
                 />
            </ListItem>
            )}

            </List>
        </div>
    )
}

export default LogBox;
