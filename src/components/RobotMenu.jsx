import GameButton from "./GameButton";

function RobotMenu({robotMenu, engine}) {
    return (
        <>
        {robotMenu?.map((item) => 
         {if (item.show) return (
            <GameButton key={item.id} 
                name={item.title} 
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