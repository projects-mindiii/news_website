import whatsappicon from "../assets/images/whatsapp_icon_only.png";
import React from "react";
import { WhatsappShareButton } from "react-share";
//-------Create a Deals Header component--------
function WhatsApp() {
  return (
    <React.Fragment>
      <button className="classiFields_whatAppIcon">
        <WhatsappShareButton url={"https://www.example.com"}>
          <span>
            <span>
              <img src={whatsappicon} alt={whatsappicon} />
              <span>WhatsApp</span>
            </span>
          </span>
        </WhatsappShareButton>
      </button>
    </React.Fragment>
  );
}
export default WhatsApp;
