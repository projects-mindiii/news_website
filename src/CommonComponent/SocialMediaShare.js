
import React from "react"
import menuicon from "../assets/images/menu_ico.png"
import linkdinicon from "../assets/images/LinkedIN_ico_new.png"
import twittericon from "../assets/images/twitter_ico.png"
import facebookicon from "../assets/images/fb_ico.png"
import whatappiconnew from "../assets/images/whatsapp_ico_new.png"

//-------Create a Deals Header component--------
function SocialMedaiShare() {

    //set language
    return (
        <React.Fragment >
            <div className="classiFields_shareMedia">
                <div className="classiFields_shareIcon">
                    <p>SHARE</p>
                    <img src={menuicon} alt={menuicon} />
                    <img src={menuicon} alt={menuicon} />
                    <img src={menuicon} alt={menuicon} />
                </div>
                <div className="classiFields_shareicons">
                    <span><span><img src={facebookicon} alt={facebookicon} /></span><span><img src={twittericon} alt={twittericon} /></span><span><img src={linkdinicon} alt={linkdinicon} /></span><span><img src={whatappiconnew} alt={whatappiconnew} /></span></span>
                </div>
            </div>

        </React.Fragment>
    );
}
export default SocialMedaiShare;