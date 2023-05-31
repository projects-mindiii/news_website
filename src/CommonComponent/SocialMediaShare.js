import React, { useState } from "react";
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
import { COUNT, COUNT_REFFRENCE } from "../utils/Constants";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SublyApi from "../helpers/Api";
import { guestUserLogin, userLogout } from "../store/slices/UserSlice";
import { STATUS_CODES } from "../utils/StatusCode";
import { Toast } from "../utils/Toaster";

//-------Create a Deals Header component--------
function SocialMedaiShare(props) {
  //set language
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => state.user);
  const [socialType, setSocialType] = useState("");


  //------ function for classified social share count-------
  async function handleCount(id) {
    let requestData = new FormData();
    requestData.append("id", id);
    requestData.append("type", COUNT.SHARES);
    requestData.append("refrence_type", COUNT_REFFRENCE.CLASSIFIED);
    requestData.append("share_in", socialType);
    await SublyApi.updateCount(requestData, userToken).then((responsejson) => {
      if (responsejson.status === STATUS_CODES.INVALID_TOKEN) {
        Toast.fire({
          icon: "error",
          title: t("SESSION_EXPIRE"),
        });
        dispatch(userLogout(userToken));
        dispatch(guestUserLogin());
        navigate("/login");
      }
    })
  } console.log("social", socialType);

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
            onClick={() => { setSocialType(2); handleCount(props.id); }}
          >
            <span> <span>
              <img src={facebookicon} alt={facebookicon} />
            </span></span>


          </FacebookShareButton>

          <TwitterShareButton
            url={"https://www.example.com"}
            quote={"Dummy text!"}
            onClick={() => { setSocialType(3); handleCount(props.id); }}
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
            onClick={() => { setSocialType(4); handleCount(props.id); }}
          >
            <span>
              <span>
                <img src={linkdinicon} alt={linkdinicon} />
              </span></span>
          </LinkedinShareButton>

          <WhatsappShareButton url={"https://www.example.com"} onClick={() => { setSocialType(1); handleCount(props.id); }}>
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
