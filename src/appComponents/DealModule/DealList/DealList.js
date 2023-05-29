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
import SublyApi from "../../../helpers/Api";
import { Toast } from "../../../utils/Toaster";
import { useDispatch, useSelector } from "react-redux";
import { COUNT, COUNT_REFFRENCE } from "../../../utils/Constants";
import { STATUS_CODES } from "../../../utils/StatusCode";
import { guestUserLogin, userLogout } from "../../../store/slices/UserSlice";

// -------function for showing deal list-----------
function DealList({ dealList, fromDeal }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //set language
    const { t } = useTranslation();
    const { userToken, currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        async function handleCount() {
            {
                dealList && dealList.length > 0 &&
                dealList.map((item, index) => {
                    let requestData = new FormData();
                    requestData.append("id", item.id);
                    requestData.append("type", COUNT.VIEW);
                    requestData.append("refrence_type", COUNT_REFFRENCE.DEAL);
                    requestData.append("share_in", 0);
                    SublyApi.updateCount(requestData, userToken).then((responsejson) => {
                        if (responsejson.status_code === STATUS_CODES.SUCCESS) {

                        } else if (responsejson.status === STATUS_CODES.INVALID_TOKEN) {
                            Toast.fire({
                                icon: "error",
                                title: t("SESSION_EXPIRE"),
                            });
                            dispatch(userLogout(userToken));
                            dispatch(guestUserLogin());
                            navigate("/login");
                        }
                    })
                })
            }
        }
        handleCount();
    }, [dealList]);


    //------ function for share view count-------
    async function handleCount(id) {
        let requestData = new FormData();
        requestData.append("id", id);
        requestData.append("type", COUNT.VIEW);
        requestData.append("refrence_type", COUNT_REFFRENCE.COMPANY);
        requestData.append("share_in", 0);
        await SublyApi.updateCount(requestData, userToken).then((responsejson) => {
            if (responsejson.status_code === STATUS_CODES.SUCCESS) {

            } else if (responsejson.status === STATUS_CODES.INVALID_TOKEN) {
                Toast.fire({
                    icon: "error",
                    title: t("SESSION_EXPIRE"),
                });
                dispatch(userLogout(userToken));
                dispatch(guestUserLogin());
                navigate("/login");
            }
        })
    }

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
                                        <a href={`https://mail.google.com/mail/?view=cm&to=${item.contact_email}&su=${"Subject"}`} target="blank">
                                            <p>{item.contact_email}</p> </a>
                                    </div>
                                </div>
                            )}
                            {item.contact_number && (
                                <div className="detailsValue">
                                    <img src={contact} alt="img" />
                                    <div className="dealText">
                                        <span>{t("CONTACT_NUMBER")}</span>
                                        <a href={`tel:${item.contact_dial_code} ${item.contact_number}`} target="blank">
                                            <p>
                                                +{item.contact_dial_code} {item.contact_number}
                                            </p></a>
                                    </div>
                                </div>
                            )}
                            {item.contact_web_url && (
                                <div className="detailsValue">
                                    <img src={globe} alt="img" />
                                    <div className="dealText websiteUrl">
                                        <span>{t("WEBSITE")}</span>
                                        <a href={item.contact_web_url} target="blank">
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

                        {fromDeal == true ? (<button className="viewProfile" onClick={() => {
                            if (
                                Object.keys(currentUser).length !== 0
                            ) {
                                handleCount(item.company_id)
                                navigate(`/deals/companies/company-profile/${item.company_id}`);
                            } else if (!Object.keys(currentUser).length) {
                                navigate(`/deals/companies/company-profile/${item.company_id}`);
                            }
                        }}
                        >{t("COMPANY_PROFILE")}</button>) : ""}

                    </div>
                ))
                : <h4 className="displayNoText">{t("NO_DEAL")}</h4>}
        </section>
    );
}
export default DealList;