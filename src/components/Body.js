import useFetch from "./useFetch";
import ChampionArray from "./ChampionArray";
import Board from "./Board";
import { useState, useEffect } from "react";
import Traits from "./Traits";
import Items from "./Items";

const Body = () => {
  const currentSet = "10";
  const currentPatch = "13.24";

  const { data, isPending, error } = useFetch("https://raw.communitydragon.org/" + currentPatch + "/cdragon/tft/en_us.json");
  const [hexagons, setHexagons] = useState(new Array(28).fill({ imageUrl: "", cost: 0, traits: null, stars: false, items: [] }));
  const [traits, setTraits] = useState(new Map());

  const addChampion = (imageUrl, cost, traits) => {
    const updatedHexagons = [...hexagons];
    const index = hexagons.findIndex(hexagon => hexagon.cost === 0);
    updatedHexagons[index] = { imageUrl: imageUrl, cost: cost, traits: traits, stars: false, items: [] };
    setHexagons(updatedHexagons);
  };

  const dragChampion = (index, imageUrl, cost, traits) => {
    const updatedHexagons = [...hexagons];
    updatedHexagons[index] = { imageUrl: imageUrl, cost: cost, traits: traits, stars: false, items: [] };
    setHexagons(updatedHexagons);
  };

  const swapChampion = (index, targetIndex) => {
    const updatedHexagons = [...hexagons];
    updatedHexagons[targetIndex] = hexagons[index];
    updatedHexagons[index] = hexagons[targetIndex];
    setHexagons(updatedHexagons);
  };

  const removeChampion = (index) => {
    const updatedHexagons = [...hexagons];
    updatedHexagons[index] = { imageUrl: "", cost: 0, traits: null, stars: false, items: [] };
    setHexagons(updatedHexagons);
  }

  const clearBoard = () => {
    const updatedHexagons = [...hexagons];
    for (let index = 0; index < hexagons.length; index++) {
      updatedHexagons[index] = { imageUrl: "", cost: 0, traits: null, stars: false, items: [] };
    }
    setHexagons(updatedHexagons);
  };

  const setStars = (index, stars) => {
    const updatedHexagons = [...hexagons];
    updatedHexagons[index].stars = stars;
    setHexagons(updatedHexagons);
  }

  const addItem = (index, url, unique) => {
    if (unique && hexagons[index].items.some(item => item.url === url)) {
      return false;
    }

    if (hexagons[index].items.length < 3) {
      const updatedHexagons = [...hexagons];
      updatedHexagons[index].items.push({ url: url, unique: unique });
      setHexagons(updatedHexagons);
      return true;
    }

    return false;
  }

  const removeItem = (position, index) => {
    const updatedHexagons = [...hexagons];
    updatedHexagons[position].items.splice(index, 1);
    setHexagons(updatedHexagons);
  }

  const swapItem = (index, targetIndex, itemIndex, url, unique) => {
    if (hexagons[targetIndex].items.length < 3) {
      const itemAdded = addItem(targetIndex, url, unique);
      if (itemAdded) removeItem(index, itemIndex);
    }
  }

  const removeAllItems = () => {
    const updatedHexagons = hexagons.map(hexagon => ({
      ...hexagon,
      items: []
    }));
    setHexagons(updatedHexagons);
  };

  useEffect(() => {
    const traitsMap = new Map();
    const traitsOrder = new Map();
    const processedUrls = new Set();

    hexagons.forEach(hexagon => {
      if (hexagon.traits) {
        if (!processedUrls.has(hexagon.imageUrl)) {
          hexagon.traits.forEach((trait, index) => {
            traitsMap.set(trait, (traitsMap.get(trait) || 0) + 1);
            traitsOrder.set(trait, index);
          });
          processedUrls.add(hexagon.imageUrl);
        }
      }
    });

    const sortedTraits = [...traitsMap.entries()].sort((a, b) => {
      const indexA = traitsOrder.get(a[0]);
      const indexB = traitsOrder.get(b[0]);

      if (indexA !== indexB) {
        return indexA - indexB;
      }

      return a[0].localeCompare(b[0]);
    });

    setTraits(sortedTraits);
  }, [hexagons]);

  return (
    <div className="body">
      {data &&
        <>
          <Traits traits={traits} traitsData={data["sets"][currentSet]["traits"]} />
          <Board hexagons={hexagons} swapChampion={swapChampion} removeChampion={removeChampion} setStars={setStars} removeItem={removeItem} swapItem={swapItem} />
          <ChampionArray data={data["sets"][currentSet]["champions"]} addChampion={addChampion} dragChampion={dragChampion} />
          <div className="buttons-and-items">
            <div className="clear-buttons">
              <button onClick={clearBoard}>Clear board</button>
              <button onClick={removeAllItems}>Clear items</button>
            </div>
            <Items data={data["items"]} addItem={addItem} currentSet={currentSet} />
          </div>
        </>
      }
      {isPending &&
        <h1>Loading...</h1>
      }
      {error &&
        <h1>Could not fetch the data</h1>
      }
    </div>
  );
}

export default Body;
