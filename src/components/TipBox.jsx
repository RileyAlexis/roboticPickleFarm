import React, { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';

const TipBox = ({ children, data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <Tooltip
      PopperProps={{
        disablePortal: true,
      }}
      onClose={() => setIsOpen(false)}
      open={isOpen}
      // Below three options prevent tooltip from blinking when react refreshes page on game timer cycle
      disableFocusListener
      disableHoverListener
      disableTouchListener
      title={
        <>
          {data && <div>{data}</div>}
        </>
      }
    >
      <span
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ display: 'flex' }}
      >
        {children}
      </span>
    </Tooltip>
  );
};

export default TipBox;
