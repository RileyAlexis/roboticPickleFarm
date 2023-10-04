import { useSelector } from "react-redux";

import { List, ListItem, ListItemText } from "@mui/material";


function LogBox() {
    const log = useSelector(store => store.log);
    let revArr = [...log].reverse();

    return (
        <div className="log-box">
            <List dense={true}>
            
            {
            revArr.map((item, index) => (
                <div className="logBoxItem" key={index}>
            <ListItem sx={{
                p: 0,
                mt: -1.4,
            }}>
                <ListItemText primary={item.line}
                 />
            </ListItem>
            </div>
            ))}

            </List>
        </div>
    )
}

export default LogBox;
