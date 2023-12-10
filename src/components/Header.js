import tftLogo from "../assets/tft_logo.png"

const Header = () => {
    return (
        <div className="header">
            <img src={tftLogo} alt="" />
            <h2>Set 10</h2>
        </div>
    );
}

export default Header;