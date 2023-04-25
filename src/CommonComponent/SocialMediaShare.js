import React from "react";
import shareicon from "../assets/images/share.png";
import menuicon from "../assets/images/menu_ico.png";
import linkdinicon from "../assets/images/LinkedIN_ico_new.png";
import twittericon from "../assets/images/twitter_ico.png";
import facebookicon from "../assets/images/fb_ico.png";
import whatappiconnew from "../assets/images/whatsapp_ico_new.png";
import { ShareSocial } from "react-share-social";
import { FacebookShareButton } from "react-share";
import { TwitterShareButton } from "react-share";
import { LinkedinShareButton } from "react-share";
import { WhatsappShareButton } from "react-share";

//-------Create a Deals Header component--------
function SocialMedaiShare() {
  //set language
  return (
    <React.Fragment>
      <div className="classiFields_shareMedia">
        <div className="classiFields_shareIcon">
          <p>SHARE</p>
          <img src={shareicon} alt={shareicon} />
          <img src={shareicon} alt={shareicon} />
          <img src={shareicon} alt={shareicon} />
        </div>
        <div className="classiFields_shareicons">
          {/* <ShareSocial
            url="url_to_share.com"
            socialTypes={["facebook", "twitter", "reddit", "linkedin"]}
          /> */}

          <FacebookShareButton
            url={"https://www.example.com"}
            quote={"Dummy text!"}
          >
            <span> <span>
              <img src={facebookicon} alt={facebookicon} />
            </span></span>
           
          </FacebookShareButton>

          <TwitterShareButton
            url={"https://www.example.com"}
            quote={"Dummy text!"}
          >
        <span>
            <span>
              <img src={twittericon} alt={twittericon} />
            </span>
            </span>
          </TwitterShareButton>

          <LinkedinShareButton
            url={"https://www.example.com"}
            quote={"Dummy text!"}
          >
            <span>
            <span>
              <img src={linkdinicon} alt={linkdinicon} />
            </span></span>
          </LinkedinShareButton>

          <WhatsappShareButton url={"https://www.example.com"}>
            <span>
            <span>
              <img src={whatappiconnew} alt={whatappiconnew} />
            </span></span>
          </WhatsappShareButton>

          {/* <span><span><img src={facebookicon} alt={facebookicon} /></span><span><img src={twittericon} alt={twittericon} /></span><span><img src={linkdinicon} alt={linkdinicon} /></span>
          <span><img src={whatappiconnew} alt={whatappiconnew} /></span></span>  */}
        </div>
      </div>
    </React.Fragment>
  );
}
export default SocialMedaiShare;
