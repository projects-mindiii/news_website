import message from "../../../assets/images/Deal_icon/contact.svg";
import contact from "../../../assets/images/Deal_icon/call.svg";
import globe from "../../../assets/images/Deal_icon/website_ico.svg";
import mail from "../../../assets/images/Deal_icon/mail.svg";
import watch from "../../../assets/images/Deal_icon/watch.svg";
import promotional from "../../../assets/images/Deal_icon/Promotional_ico.svg";
import dealIcon from "../../../assets/images/Bitmap.png"
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import WhatsApp from "../../../CommonComponent/Whatappshare";
import Loader from "../../../utils/Loader/Loader";

// -------function for showing deal list-----------
function DealList({ dealList, fromDeal }) {
    const navigate = useNavigate();
    //set language
    const { t } = useTranslation();

    useEffect(() => {
    }, [dealList]);

    return (
        <section>
            {dealList && dealList.length > 0 ?
                dealList.map((item, index) => (
                    <div className="latestDeals" key={index}>
                        <img src={item.gallery ? item.gallery[0].img_url : dealIcon} alt="deals" />
                        <h3>{item.name}</h3>
                        <p className="dealSubText">{item.description}</p>
                        <div className="dealDetails">
                            {item.contact_name && (
                                <div className="detailsValue">
                                    <img src={message} alt="img" />
                                    <div className="dealText">
                                        <span>{t("CONTACT_PERSON")}</span>
                                        <p>{item.contact_name}</p>
                                    </div>
                                </div>
                            )}

                            {item.deal_expire_date && (
                                <div className="detailsValue">
                                    <img src={watch} alt="img" />
                                    <div className="dealText">
                                        <span>{t("EXPIRY")}</span>
                                        <p>{item.deal_expire_date}</p>
                                    </div>
                                </div>
                            )}

                            {item.contact_email && (
                                <div className="detailsValue">
                                    <img src={mail} alt="img" />
                                    <div className="dealText websiteUrl">
                                        <span>{t("EMAIL_TEXT")}</span>
                                        <a href={`https://mail.google.com/mail/?view=cm&to=${item.contact_email}&su=${"Subject"}`}>
                                            <p>{item.contact_email}</p> </a>
                                    </div>
                                </div>
                            )}
                            {item.contact_number && (
                                <div className="detailsValue">
                                    <img src={contact} alt="img" />
                                    <div className="dealText">
                                        <span>{t("CONTACT_NUMBER")}</span>
                                        <p>
                                            +{item.contact_dial_code} {item.contact_number}
                                        </p>
                                    </div>
                                </div>
                            )}
                            {item.contact_web_url && (
                                <div className="detailsValue">
                                    <img src={globe} alt="img" />
                                    <div className="dealText websiteUrl">
                                        <span>{t("WEBSITE")}</span>
                                        <a href={item.contact_web_url}>
                                            <p>{item.contact_web_url}</p></a>
                                    </div>
                                </div>
                            )}

                            {item.promo_code && (
                                <div className="detailsValue">
                                    <img src={promotional} alt="img" />
                                    <div className="dealText">
                                        <span>{t("PROMOTION_CODE")}</span>
                                        <p>{item.promo_code}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="dealPrice">
                            <h4>
                                {item.currency_code} {item.price.toFixed(2)}
                            </h4>{" "}
                            <span>{item.tax_lable}</span>
                        </div>
                        {item.contact_whatsapp_contact_number && (
                            <div className="watsappCls">
                                <WhatsApp watsApp={false} />
                            </div>
                        )}

                        {fromDeal == true ? (<button className="viewProfile" onClick={() => { navigate(`/deals/latest-deals/company-profile/${item.company_id}`) }}>{t("COMPANY_PROFILE")}</button>) : ""}

                    </div>
                ))
                : <h4 className="displayNoText">{t("NO_DEAL")}</h4>}
        </section>
    );
}
export default DealList;