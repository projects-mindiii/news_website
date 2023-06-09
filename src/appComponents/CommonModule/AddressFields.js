import { Icon } from "@iconify/react";
import mapIcon from "../../assets/images/socialMedia_icon/map_ico1.svg";
import { useTranslation } from "react-i18next";
import contact from "../../assets/images/Deal_icon/call.svg";
import mail from "../../assets/images/Deal_icon/mail.svg";
import WhatsApp from "../../CommonComponent/Whatappshare";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";

function AddressFields(props) {
    //set language
    const { t } = useTranslation();

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    });

    return (
        <section>
            {props.addressSet.length > 0 && (
                <>
                    {props.addressSet.length > 0 && props.addressSet.map((item, index) => (
                        <div className="accordion mapAccordion" id="accordionExample" key={index}>
                            <div className="card">
                                <div className="card-header" id={item.id}>
                                    <h2 className="mb-0">
                                        <button
                                            className="btn-link btn-block text-left collapsed"
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
                                    className="collapse"
                                    aria-labelledby={item.id}
                                    data-parent="#accordionExample"
                                >
                                    <div className="card-body">
                                        <div className="mapBoxCls">
                                            {!isLoaded ? (
                                                <h1>Loading...</h1>
                                            ) : (
                                                <GoogleMap
                                                    mapContainerClassName="map-container"
                                                    center={{ lat: parseFloat(item.latitude), lng: parseFloat(item.longitude) }}
                                                    zoom={10}
                                                >
                                                    <Marker position={{ lat: parseFloat(item.latitude), lng: parseFloat(item.longitude) }} />
                                                </GoogleMap>
                                            )}
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
                                                        <a href={`https://mail.google.com/mail/?view=cm&to=${item.email}&su=${"Subject"}`} target="blank">
                                                            <p>{item.email}</p>
                                                        </a>
                                                    </div>
                                                </div>
                                            )}

                                            {item.contact && (
                                                <div className="detailsValue">
                                                    <img src={contact} alt="img" />
                                                    <div className="dealText">
                                                        <h5>{t("CONTACT_PERSON")}</h5>
                                                        <a href={`tel:+${item.dial_code} ${item.contact}`} target="blank">
                                                            <p>+{item.dial_code} {item.contact}</p></a>
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