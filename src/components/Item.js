const Item = ({url, addItem, unique, opacity}) => {
    const imageUrl = "https://raw.communitydragon.org/latest/game/" + url.toLowerCase().replace(".tex", ".png");

    const handleItemOnDragEnd = (event) => {
        const x = event.clientX;
        const y = event.clientY;
    
        const elementAtDragEnd = document.elementFromPoint(x, y);
    
        if (elementAtDragEnd) {
            const type = elementAtDragEnd.getAttribute("type");
            const positionValue = elementAtDragEnd.getAttribute("position");
            if (type === "champion")
            {
                addItem(positionValue, imageUrl, unique);
            }
        }
    };

    return ( 
        <div className="item-card" style={{ opacity: opacity }}>
            <img
                src={imageUrl} 
                alt="item-icon"
                onDragEnd={handleItemOnDragEnd}
            />
        </div>
     );
}
 
export default Item;