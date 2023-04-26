import React from "react";
import emailicon from "../assets/images/email_ico.png";
import callicon from "../assets/images/call_ico.png";
import { AiOutlineStar } from "react-icons/ai";
import { useTranslation } from "react-i18next";
//-------Create a Deals Header component--------
function ContactPerson(props) {
  const { t } = useTranslation();
  return (
      <React.Fragment>
        <div className="classiFields_contactPersondetail">
          <p className="heading">{t("CONTACT_PERSON")}</p>
          {props.forSaleListData[props.index].contact_company && (
            <div className="classiFields_PersonAboutShow">
            <div className="classiFields_iconBackGround">
              <AiOutlineStar />
            </div>
            <div className="classiFields_emailHeadingText">
              <p>{t("COMPANY")}</p>
              <p>{props.forSaleListData[props.index].contact_company}</p>
            </div>
          </div>)}
         
          <div className="classiFields_PersonAboutShow">
            <div className="classiFields_iconBackGround">
              <img src={emailicon} alt={emailicon} />
            </div>
            <div className="classiFields_emailHeadingText">
              <p>{t("CONTACT_PERSON_EMAIL")}</p>
              <p>{props.forSaleListData[props.index].email}</p>
            </div>
            <div></div>
          </div>
          {props.forSaleListData[props.index].contact && (
            <div className="classiFields_PersonAboutShow classiFields_mobileMargingRemove">
            <div className="classiFields_iconBackGround">
              <img src={callicon} alt={callicon} />
            </div>
            <div className="classiFields_emailHeadingText">
              <p>{t("CONTACT_NUMBER")}</p>
              <p>{props.forSaleListData[props.index].contact}</p>
            </div>
            <div></div>
          </div>
          )}
          
        </div>
      </React.Fragment>
   
  );
}
export default ContactPerson;
