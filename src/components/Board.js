import Hexagon from "./Hexagon";

const Board = ({ hexagons, swapChampion, removeChampion, setStars, removeItem, swapItem }) => {
    return (
        <div className="board">
            {hexagons.map((hexagon, index) => (
                <Hexagon 
                    key={index} 
                    position={index} 
                    imageUrl={hexagon.imageUrl} 
                    cost={hexagon.cost} 
                    swapChampion={swapChampion}
                    removeChampion={removeChampion}
                    stars={hexagon.stars} 
                    setStars={setStars}
                    items={hexagon.items}
                    removeItem={removeItem}
                    swapItem={swapItem}
                />
            ))}
        </div>
    );
};

export default Board;