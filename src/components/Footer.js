import gitLogo from "../assets/git_logo.png"

const Footer = () => {
    return (
        <div className="footer">
            <a href="https://github.com/stepboomz/"><img src={gitLogo} alt="" /></a>
            <h2>Created by Stepboomz</h2>
        </div>
    );
}

export default Footer;