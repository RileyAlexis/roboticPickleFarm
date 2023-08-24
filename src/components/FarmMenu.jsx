import GameButton from "./GameButton";

function FarmMenu({farmMenuItems, engine}) {

    return (
        <div className="buttonBox">
        {farmMenuItems?.map((item) => 
            {if (item.show) return (
                    <GameButton key={item.name} 
                        name={item.name} 
                        buttonCall={engine.buttonCall} 
                        disable={item.dis}
                        show={item.show}
                        coolDown={item.coolDown} />
            )
            else return (null)
            }
        )}
    </div>
    )
}

export default FarmMenu;