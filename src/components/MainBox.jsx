import { useSelector } from 'react-redux';
import { useState } from 'react';

import { Tab, Tabs } from '@mui/material';

import FarmMenu from './FarmMenu';
import RobotMenu from './RobotMenu';
import TabNavItem from './TabNavItem';
import TabContent from './TabContent';
import CheatsForTesting from './cheatsForTesting';

function MainBox() {

    const tabStyle = {
        transition: 'background-color 0.1s', 
      };

    const [activeTab, setActiveTab] = useState('farm');
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
    {value === 4 && <CheatsForTesting />}
    





















           {/* tab nav */}
        {/* <div className="main-box-nav">
            {locationMenu.map((items) => <TabNavItem title={items.title}
                id={items.id} activeTab={activeTab} setActiveTab={setActiveTab}/>
            )}            
        </div>
        <div className="main-box-outlet">
            <TabContent id="farm" activeTab={activeTab}>
                <FarmMenu  />
            </TabContent>
            <TabContent id="robots" activeTab={activeTab}>
                <RobotMenu />
            </TabContent>
            <TabContent id="buildings" activeTab={activeTab}>
                <p>buildings tab</p>
            </TabContent>
            <TabContent id="powerUps" activeTab={activeTab}>
                <p>power Ups tab</p>
                </TabContent>
        </div>
        <CheatsForTesting /> */}
        
        </>

    );
};

export default MainBox;