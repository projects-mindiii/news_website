import React from "react";
import shareicon from "../assets/images/share.png";
import linkdinicon from "../assets/images/LinkedIN_ico_new.png";
import twittericon from "../assets/images/twitter_ico.png";
import facebookicon from "../assets/images/fb_ico.png";
import whatappiconnew from "../assets/images/whatsapp_ico_new.png";
import { FacebookShareButton } from "react-share";
import { TwitterShareButton } from "react-share";
import { LinkedinShareButton } from "react-share";
import { WhatsappShareButton } from "react-share";
import { useTranslation } from "react-i18next";

//-------Create a Deals Header component--------
function SocialMedaiShare() {
  //set language
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <div className="classiFields_shareMedia">
        <div className="classiFields_shareIcon">
          <p>{t("SHARE")}</p>
          <img src={shareicon} alt={shareicon} />
          <img src={shareicon} alt={shareicon} />
          <img src={shareicon} alt={shareicon} />
        </div>
        <div className="classiFields_shareicons">
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

        </div>
      </div>
    </React.Fragment>
  );
}
export default SocialMedaiShare;
