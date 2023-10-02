import { useSelector } from 'react-redux';
import {useState} from 'react';

import FarmMenu from './FarmMenu';
import RobotMenu from './RobotMenu';
import TabNavItem from './TabNavItem';
import TabContent from './TabContent';

function MainBox() {
    const [activeTab, setActiveTab] = useState('farm');
    const locationMenu = useSelector(store => store.locationMenu);

    return (
        <div className="main-box">
           {/* tab nav */}
        <ul className="main-box-nav">
            {locationMenu.map((items) => <TabNavItem title={items.title}
                id={items.id} activeTab={activeTab} setActiveTab={setActiveTab}/>
            )}            
        </ul>
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
        
        </div>

    );
};

export default MainBox;