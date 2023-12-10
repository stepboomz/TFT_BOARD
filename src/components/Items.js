import Item from "./Item";
import { useState } from "react";

const Items = ({data, addItem, currentSet}) => {
    const [searchText, setSearchText] = useState("");

    const filterItems = (items) => {
      const uniqueIcons = new Set();
      
      return items.filter(item => {
        const isStandardIcon = item.icon.startsWith("ASSETS/Maps/Particles/TFT/Item_Icons/Standard/");
        const isSpatulaIcon = item.icon.startsWith("ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set" + currentSet + "/");
    
        if ((item.name !== "Guardian Angel" && item.composition.length > 0 && isStandardIcon) || isSpatulaIcon) {
          if (!uniqueIcons.has(item.icon)) {
            uniqueIcons.add(item.icon);
            return true;
          }
        }
    
        return false;
      }).sort((item1, item2) => {
        const isItem1Spatula = item1.icon.startsWith("ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set" + currentSet + "/");
        const isItem2Spatula = item2.icon.startsWith("ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set" + currentSet + "/");
    
        if (isItem1Spatula && !isItem2Spatula) {
          return -1;
        } else if (!isItem1Spatula && isItem2Spatula) {
          return 1;
        } else if (isItem1Spatula && isItem2Spatula) {
          const compositionDiff = item1.composition.length - item2.composition.length;
          if (compositionDiff !== 0) {
            return compositionDiff;
          }
        }
    
        return item1.name.localeCompare(item2.name);
      });
    };
    
      
    return (
        <div className="items-array">
            <div className="sort-items">
                <input type="text" placeholder="Search item..." maxLength={100} value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
                {searchText && <button className="clear-search-items-button" onClick={() => setSearchText("")}>✕</button>}
            </div>
            <div className="items">
                {filterItems(data).map((item) => (
                    <Item 
                      key={item.name} 
                      url={item.icon} 
                      addItem={addItem}
                      unique={item.unique}
                      opacity={item.name.toLowerCase().includes(searchText.toLowerCase()) ? 1 : 0.2}
                    />
                ))}
            </div>
        </div>
      );
}

export default Items;