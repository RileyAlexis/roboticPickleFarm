import { useEffect, useState } from "react";
import pickle from '../../images/icons8-pickle-64.png';
import pickle2 from '../../images/cucumber_5029002.png';
import robot from '../../images/robot_5114835.png';

function WinGame() {
    
    const iconsList = [pickle, pickle2, robot];
    const [icons, setIcons] = useState([]);

    useEffect(() => {
        const createFallingIcon = () => {
            const icon = iconsList[Math.floor(Math.random() * iconsList.length)];
            const position = Math.random() * window.innerWidth;
            const left = Math.random() * window.innerHeight;
            const speed = Math.random() * 5 + 2;
            return { icon, position, left, speed };
        };
        
        const updateIcons = () => {
            setIcons((prevIcons) => {
                const newIcons = [...prevIcons];
                for (let i = 0; i < newIcons.length; i++) {
                    newIcons[i].position += newIcons[i].speed;
                    if (newIcons[i].position > window.innerHeight) {
                        newIcons[i].position = 0;
                    }
                }
                return newIcons;
            });
        };

        const initialIcons = Array.from({length: 70}, createFallingIcon);
        setIcons(initialIcons);
        const intervalId = setInterval(updateIcons, 10);
        return () => clearInterval(intervalId);
    }, []);


    return (
        <>
        <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        {icons.map((fallingIcon, index) => (
          <img
            key={index}
            src={fallingIcon.icon}
            alt={`icon-${index}`}
            style={{
              position: 'absolute',
              left: fallingIcon.left,
              top: fallingIcon.position,
              width: '30px', // Adjust the size as needed
              height: '30px',
            }}
          />
        ))}
      </div>
        <a target="_blank" href="https://icons8.com/icon/4eHYKrSDoFtN/pickle">Pickle</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
        <a href="https://www.freepik.com/icon/cucumber_5029002#fromView=search&term=pickle&page=1&position=34&track=ais">Icon by RIkas Dzihab</a>
        <a href="https://www.freepik.com/icon/robot_5114835#fromView=search&term=robots&page=1&position=8&track=ais">Icon by Talha Dogar</a>
        </>
    )
}

export default WinGame;