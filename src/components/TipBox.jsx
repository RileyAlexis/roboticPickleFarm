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
        style={{ display: 'inline-block' }}
      >
        {children}
      </span>
    </Tooltip>
  );
};

export default TipBox;
