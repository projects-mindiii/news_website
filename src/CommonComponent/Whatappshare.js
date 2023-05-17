import React from "react";
import { WhatsappShareButton } from "react-share";
import { useTranslation } from "react-i18next";
import { BsWhatsapp } from "react-icons/bs";

//-------Create a Deals Header component--------
function WhatsApp(props) {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <button className="classiFields_whatAppIcon">
        <WhatsappShareButton url={"https://www.example.com"}>
          <span>
            <BsWhatsapp />
            {props.watsApp === true ? (<span>{t("WHATSAPP")}</span>) : <span>{t("WHATSAPP_ME")}</span>}
          </span>
        </WhatsappShareButton>
      </button>
    </React.Fragment>
  );
}
export default WhatsApp;

