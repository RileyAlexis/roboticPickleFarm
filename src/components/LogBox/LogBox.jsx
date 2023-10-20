import { useSelector } from "react-redux";

import { List, ListItem, ListItemText, Typography } from "@mui/material";
import './LogBox.css';

function LogBox() {
    const log = useSelector(store => store.log);
    return (
        <div className="roll-outLog">
            <List dense={true}>
            
            {
            log.map((item, index) => (
                <div className="entryItem" key={index}>
                    <Typography variant="caption">{item.cycle}</Typography>
                    <Typography variant="body"> - {item.line}</Typography>
            {/* <ListItem sx={{
                p: 0,
                mt: -1.4,
            }}>
                <ListItemText primary={item.line}
                 />
            </ListItem> */}
            </div>
            ))}

            </List>
        </div>
    )
}

export default LogBox;
