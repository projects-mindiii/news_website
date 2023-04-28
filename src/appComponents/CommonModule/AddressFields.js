import { Icon } from "@iconify/react";
import mapIcon from "../../assets/images/socialMedia_icon/map_ico.png";
import { useTranslation } from "react-i18next";
import contact from "../../assets/images/Deal_icon/contact_ico.png";
import mail from "../../assets/images/Deal_icon/mail_ico.png";
import WhatsApp from "../../CommonComponent/Whatappshare";

function AddressFields(props) {
    //set language
    const { t } = useTranslation();

    return (
        <section>
            {props.addressSet.length > 0 && (
                <>
                    {props.addressSet.length > 0 && props.addressSet.map((item, index) => (<div class="accordion mapAccordion" id="accordionExample">
                        <div class="card" key={index}>
                            <div class="card-header" id={item.id}>
                                <h2 class="mb-0">
                                    <button
                                        class="btn-link btn-block text-left collapsed"
                                        type="button"
                                        data-toggle="collapse"
                                        data-target={"#collapseOne" + item.id}
                                        aria-expanded="true"
                                        aria-controls={"collapseOne" + item.id}
                                    >
                                        {item.name}
                                        <Icon
                                            icon="material-symbols:keyboard-arrow-up"
                                            width="45"
                                            height="45"
                                            className="hideIcon"
                                        />
                                        <Icon
                                            icon="material-symbols:keyboard-arrow-down"
                                            width="45"
                                            height="45"
                                            className="showIcon"
                                        />
                                    </button>
                                </h2>
                            </div>
                            <div
                                id={"collapseOne" + item.id}
                                class="collapse"
                                aria-labelledby={item.id}
                                data-parent="#accordionExample"
                            >
                                <div class="card-body">
                                    <div className="mapBox">

                                    </div>
                                    <div className="mapLocationSet">
                                        {item.contact_person && (
                                            <h1>{item.contact_person}</h1>
                                        )}

                                        {item.address && (
                                            <div className="detailsValue">
                                                <img src={mapIcon} alt="img" />
                                                <div className="dealText">
                                                    <h5>{t("ADDRESS")}</h5>
                                                    <p>{item.address}</p>
                                                </div>
                                            </div>
                                        )}

                                        {item.email && (
                                            <div className="detailsValue">
                                                <img src={mail} alt="img" />
                                                <div className="dealText">
                                                    <h5>{t("EMAIL_TEXT")}</h5>
                                                    <p>{item.email}</p>
                                                </div>
                                            </div>
                                        )}

                                        {item.contact && (
                                            <div className="detailsValue">
                                                <img src={contact} alt="img" />
                                                <div className="dealText">
                                                    <h5>{t("CONTACT_PERSON")}</h5>
                                                    <p>+{item.dial_code}{item.contact}</p>
                                                </div>
                                            </div>
                                        )}

                                        {item.whatapp_contact_number && (

                                            <div className="watsappCls">
                                                <WhatsApp watsApp={true} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>))}
                </>
            )}
        </section>
    );
}

export default AddressFields;