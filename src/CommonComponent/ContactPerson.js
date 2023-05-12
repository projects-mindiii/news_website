import React from "react";
import companyIcon from "../assets/images/company_ico.svg";
import emailicon from "../assets/images/email_ico.png";
import callicon from "../assets/images/callIcon.png";
import { useTranslation } from "react-i18next";
import { AiOutlineStar } from "react-icons/ai";

//-------Create a Deals Header component--------
function ContactPerson(props) {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <div className="classiFields_contactPersondetail">
        <p className="heading">{t("CLASSIFIED_CONTACT_PERSON")}</p>
        {props.forSaleListData[props.index].contact_company && (
          <div className="classiFields_PersonAboutShow">
            <div className="classiFields_iconBackGround">
              <img src={companyIcon} alt={companyIcon} />
              {/* <AiOutlineStar /> */}
            </div>
            <div className="classiFields_emailHeadingText">
              <p>{t("COMPANY")}</p>
              <span>{props.forSaleListData[props.index].contact_company}</span>
            </div>
          </div>
        )}
        {props.forSaleListData[props.index].email && (
          <div className="classiFields_PersonAboutShow">
            <div className="classiFields_iconBackGround">
              <img src={emailicon} alt={emailicon} />
            </div>
            <div className="classiFields_emailHeadingText">
              <p>{t("CONTACT_PERSON_EMAIL")}</p>
              <a href={`https://mail.google.com/mail/?view=cm&to= ${props.forSaleListData[props.index].email}&su=${"Subject"}`}>
                                            <span> {props.forSaleListData[props.index].email}</span> </a>
            </div>
            <div></div>
          </div>
        )}
        {props.forSaleListData[props.index].contact && (
          <div className="classiFields_PersonAboutShow classiFields_mobileMargingRemove">
            <div className="classiFields_iconBackGround">
              <img src={callicon} alt={callicon} />
            </div>
            <div className="classiFields_emailHeadingText">
            <p>{t("CONTACT_NUMBER")}</p> 
              <span><a href={`tel:${props.forSaleListData[props.index].contact}`}>{props.forSaleListData[props.index].contact}</a></span>
            </div>
            <div></div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
export default ContactPerson;
