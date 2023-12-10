import Trait from "./Trait";

const Traits = ({ traits, traitsData }) => {
    const traitData = (trait) => {
        return traitsData.find(item => item.name === trait);
    }

    const imageUrl = (trait) => {
        return "https://raw.communitydragon.org/latest/game/" + traitData(trait).icon.toLowerCase().replace(".tex", ".png");
    }

    const currentStyle = (trait, count) => {
        const data = traitData(trait);
        let selectedStyle = -1;
    
        for (const effect of data.effects) {
            if (count >= effect.minUnits && count <= effect.maxUnits) {
                selectedStyle = effect.style;
                break;
            }
        }
    
        return selectedStyle;
    }

    const activeTraits = Array.from(traits).map(([trait, count]) => (
        <Trait key={trait} trait={trait} count={count} imageUrl={imageUrl(trait)} traitData={traitData(trait)} currentStyle={currentStyle(trait, count)} />
    )).sort((a, b) => b.props.currentStyle - a.props.currentStyle);


    return (
        <div className="traits">
            {activeTraits.length > 0 ? activeTraits : <div className="no-traits">⚠<br /><b>No active trait</b></div>}
        </div>
    );
}

export default Traits;
