
import {useState} from 'react';

import FarmMenu from './FarmMenu';
import RobotMenu from './RobotMenu';
import TabNavItem from './TabNavItem';
import TabContent from './TabContent';

function MainBox({locationMenu, farmMenuItems, robotMenu, engine}) {
    const [activeTab, setActiveTab] = useState('farm');

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
                <FarmMenu farmMenuItems={farmMenuItems} engine={engine} />
            </TabContent>
            <TabContent id="robots" activeTab={activeTab}>
                <RobotMenu robotMenu={robotMenu} engine={engine} />
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