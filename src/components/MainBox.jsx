function MainBox ({mainBoxMenuItems}) {

    return (
        <>
        {mainBoxMenuItems.map((items) => {
            if (items.display) return (
                <button key={items.name} className="main-box-btn" onClick={items.onClick}>{items.name}</button>
            )
                else return (null);
            }
            
        )}
       
        </>
    

    )
}

export default MainBox;