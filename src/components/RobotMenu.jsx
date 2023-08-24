import GameButton from "./GameButton";

function RobotMenu({robotMenu, engine}) {
    return (
        <>
        {robotMenu?.map((item) => 
         {if (item.active) return (
            <GameButton key={item.name} 
                name={item.name} 
                buttonCall={engine.buttonCall} 
                disable={item.dis} 
                coolDown={item.coolDown} />
    )
    else return (null)
    }
        )}
        
        </>
    )
}

export default RobotMenu;