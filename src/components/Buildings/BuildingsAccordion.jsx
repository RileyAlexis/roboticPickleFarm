import { useDispatch } from 'react-redux';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
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
        console.log('Dispatch',building.name, e.target.value)
        dispatch({ type: 'buildings/changeOption', payload: { title: building.name, value: e.target.value}})
    }

    return (
        <div>
            {console.log(building.name, building.selectedOption)}
            <Accordion 
            sx={{
                backgroundColor: 'transparent',
                width: '100%'
            }}
            disableGutters
            expanded={building.expanded} onChange={handleChange(building.name)}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant='body'>{building.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
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