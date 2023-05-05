import message from "../../../assets/images/Deal_icon/message.png";
import contact from "../../../assets/images/Deal_icon/contact_ico.png";
import globe from "../../../assets/images/Deal_icon/globe_ico.png";
import mail from "../../../assets/images/Deal_icon/mail_ico.png";
import watch from "../../../assets/images/Deal_icon/watch.png";
import promotional from "../../../assets/images/Deal_icon/promotional.png";
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
            {dealList ?
                dealList.map((item, index) => (
                    <div className="latestDeals" key={index}>
                        <img src={item.gallery[0].img_url} alt="deals" />
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
                                        <p>{item.contact_web_url}</p>
                                    </div>
                                </div>
                            )}
                            {item.contact_email && (
                                <div className="detailsValue">
                                    <img src={mail} alt="img" />
                                    <div className="dealText websiteUrl">
                                        <span>{t("EMAIL_TEXT")}</span>
                                        <p>{item.contact_email}</p>
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
                                {item.currency_code} {new Intl.NumberFormat().format(item.price)}
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
                : <Loader />}
        </section>
    );
}
export default DealList;