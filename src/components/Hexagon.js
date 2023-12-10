import { useEffect, useState } from "react";

const Hexagon = ({ position, imageUrl, cost, swapChampion, removeChampion, stars, setStars, items, removeItem, swapItem }) => {
    const [showStars, setShowStars] = useState(false);

    const handleMouseEnter = () => {
        setShowStars(true);
      };
    
      const handleMouseLeave = () => {
        if (stars === false) setShowStars(false);
      };

    const handleOnDragEnd = (event) => {
        const x = event.clientX;
        const y = event.clientY;
    
        const elementAtDragEnd = document.elementFromPoint(x, y);
    
        if (elementAtDragEnd) {
            const positionValue = elementAtDragEnd.getAttribute("position");
            if (positionValue)
            {
                swapChampion(position, positionValue);
            }
        }
    };

    const handleItemOnDragEnd = (event, index, url, unique) => {
        const x = event.clientX;
        const y = event.clientY;

        const elementAtDragEnd = document.elementFromPoint(x, y);
    
        if (elementAtDragEnd) {
            const type = elementAtDragEnd.getAttribute("type");
            const positionValue = elementAtDragEnd.getAttribute("position");
            if (type === "champion")
            {
                swapItem(position, positionValue, index, url, unique);
            }
        }
    };

    const allowDrop = (event) => {
        event.preventDefault();
      }

    useEffect(() => {
        if (cost === 0) {
            setShowStars(false);
        }
    }, [cost]);

    let marginLeft = 0;
    let starsMarginLeft = 0;
    let backgroundColor;

    if (position === 7 || position === 21) {
        marginLeft = 60;
        starsMarginLeft = 27.5;
    }
    else {
        marginLeft = 5;
    }

    switch (cost) {
        case 1:
            backgroundColor = "grey";
            break;
        case 2:
            backgroundColor = "#009600";
            break;
        case 3:
            backgroundColor = "#1E82FF";
            break;
        case 4:
            backgroundColor = "#C800C8";
            break;
        case 5:
            backgroundColor = "#FFC800";
            break;
        default:
            backgroundColor = "#464c70";
            break;
    }

    return (
        <div className="hexagon">
            <div className="hexagon-border" style={{ marginLeft: `${marginLeft}px`, backgroundColor }}>
                <div className="hexagon-image" position={position} onDragOver={allowDrop}>
                    {imageUrl && <img src={imageUrl} alt="champion-img" position={position} type="champion" onClick={() => removeChampion(position)} onDragEnd={handleOnDragEnd} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}/>}
                </div>
            </div>
            {showStars && 
            <div className="stars" 
                style={{
                     marginLeft: `${starsMarginLeft}px`,
                     color: stars ? '#f1d25e' : '#565f8a',
                    }} 
                onClick={() => setStars(position, !stars)} 
                onMouseEnter={handleMouseEnter} 
                onMouseLeave={handleMouseLeave}
                >★★★
            </div>}
            <div className="champion-items"
            style={{
                marginLeft: `${starsMarginLeft}px`,
               }} >
            {items.length > 0 &&
                items.map((item, index) => (
                    <img className="champion-item-icon" 
                        key={index} 
                        src={item.url} 
                        alt="champion-item-icon" 
                        onClick={() => removeItem(position, index)}
                        onDragEnd={(event) => handleItemOnDragEnd(event, index, item.url, item.unique)}
                    />
                ))}
            </div>
        </div>
    );
}

export default Hexagon;