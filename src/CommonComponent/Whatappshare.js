import whatsappicon from "../assets/images/whatsapp_icon_only.png";
import React from "react";
import { WhatsappShareButton } from "react-share";
import { useTranslation } from "react-i18next";

//-------Create a Deals Header component--------
function WhatsApp() {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <button className="classiFields_whatAppIcon">
        <WhatsappShareButton url={"https://www.example.com"}>
          <span>
            <span>
              <img src={whatsappicon} alt={whatsappicon} />
              <span>{t("WHATSAPP")}</span>
            </span>
          </span>
        </WhatsappShareButton>
      </button>
    </React.Fragment>
  );
}
export default WhatsApp;
