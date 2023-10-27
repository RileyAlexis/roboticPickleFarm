import { useDispatch } from 'react-redux';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Select, MenuItem, FormControl, FormControlLabel, InputLabel, Switch } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import './Buildings.css';
import { useState } from 'react';

function BuildingsAccordion({building}) {
    const dispatch = useDispatch();
    const [selectTheThing, setSelectTheThing] = useState(0);
    const selectedOption = building.selectedOption;
    
    const handleChange = (name) => (event) => {
        dispatch({ type: 'buildings/toggleExpander', payload: name });
    }

    const handleSelectChange = (e) => {
        dispatch({ type: 'buildings/changeOption', payload: { title: building.name, value: e.target.value}})
    }

    const handleSwitchChange = (e) => {
        dispatch({ type: 'buildings/toggleActiveItem', payload: { title: building.name, value: e.target.value}})
        if (!e.target.value) { dispatch({ type: 'buildings/setActiveCost', payload: { title: building.name, value: 0 }}) }
    }

    const handleSwitchClick = event => {
        event.stopPropagation(); // Stop event propagation to prevent the accordion from expanding/collapsing
      };
console.log(`Active Cost of ${building.name}`, building.activeCost);
    return (
        <div>
            <Accordion 
            sx={{
                backgroundColor: 'transparent',
                width: '100%'
            }}
            disableGutters
            expanded={building.expanded} onChange={handleChange(building.name)}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant='body'>{building.name}</Typography>
                    { building.active ? (
                          <Typography 
                          sx={{
                              marginLeft: '5px'
                          }}
                          variant='caption'>-{building.recurringCost + building.activeCost} /s</Typography>
                    )
                        :
                        (<Typography 
                            sx={{
                                marginLeft: '5px'
                            }}
                            variant='caption'>-0/s</Typography>)
                }
                    
                  
                    <div style={{ marginLeft: 'auto' }}>
                    <FormControlLabel
                        control={<Switch 
                            size='small'
                            onClick={handleSwitchClick}
                            checked={building.active} onChange={handleSwitchChange} color="primary" />}
                        label="Active"
                        />
                </div>
                </AccordionSummary>
                <AccordionDetails>
                <Typography sx={{
                marginRight: '10px'
                }}
                variant='caption'>{building.data}</Typography>
                <br /><br />
                <Typography sx={{
                marginRight: '10px'
                }}
                variant='caption'>{building.line}</Typography>
                <FormControl 
                    style={{
                        alignItems: 'flex-end',
                    }}

                    size='small'
                    variant="outlined" margin="small">
                    <InputLabel 
                        sx={{
                            minWidth: 'min-content'
                        }}
                        id="building-select-label">{building.label}</InputLabel>
                    <Select
                    style={{
                        width: '90px',
                    }}
                        labelId="building-select-label"
                        id="building-select"
                        label={building.label}
                        value={building.selectedOption}
                        onChange={handleSelectChange}
                    >
                        {building.options.map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                </AccordionDetails>
            </Accordion>
        </div>
    )
        
    

}

export default BuildingsAccordion;