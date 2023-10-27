import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { formatNumber } from '../../modules/utilFunction';
import './TipWindow.css';
import { Typography } from '@mui/material';

function TipWindow({data, children}) {

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseOver = () => {
        setIsHovered(true);
        };

    const handleMouseOut = () => {
        setIsHovered(false);
        };

 return (
    <div className="tipWindowContainer" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        {isHovered && (
            <div className="tipWindow">
                {data.map((item, index) => {
                    return (
                    <div key={index}>
                    
                    <Typography variant='caption'>{item.building}:(-{formatNumber(item.cost)} /s)</Typography>
                    </div>
                    )
                })}
            </div>
        )}
        {children}
    </div>
    )
}

export default TipWindow;