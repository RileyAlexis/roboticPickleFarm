import { useSelector } from 'react-redux';
import { useState } from 'react';

import { Tab, Tabs } from '@mui/material';

import FarmMenu from './FarmMenu';
import RobotMenu from './RobotMenu';
import CheatsForTesting from './cheatsForTesting';
import UpgradeMenu from './UpgradesMenu';

function MainBox() {

    const tabStyle = {
        transition: 'background-color 0.1s', 
      };

    const locationMenu = useSelector(store => store.locationMenu);
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
        <>
    <Tabs value={value} onChange={handleChange}>
      {locationMenu.map((tab, index) => {
        if (tab.show) {
          return (
            <Tab
              key={tab.id}
              label={tab.title}
              value={index}
              style={tabStyle}
            />
          );
        }
        return null;
      })}
    </Tabs>
    {value === 0 && <FarmMenu />}
    {value === 1 && <RobotMenu />}
    {value === 3 && <UpgradeMenu />}
    {value === 4 && <CheatsForTesting />}
    
        </>

    );
};

export default MainBox;