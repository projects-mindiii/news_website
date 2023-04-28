import mapicon from "../assets/images/map_ico.png";
import { Row, Col } from "react-bootstrap";
import bookmarkicon from "../assets/images/bookmark_ico.png";
import forsale from "../assets/images/for_sale_img.png";
import watchicon from "../assets/images/watch_ico.png";

function CommonDataShow(props) {
    return (
        <div className="classiFieds_forSaleBox">
            <div className="classiFieds_forSale_about">
                <div className="classiFieds_forSale">
                    <img src={props.yourdata.img_url} alt={forsale} />
                </div>
                <div className="classiFields_heading">
                    <p className="text">
                        {props.yourdata.heading}
                    </p>
                    <div className="classiFieds_time_action">
                        <div className="classiFieds_time">
                            <div >
                                <button className="classiFieds_forSale_button">
                                    {props.yourdata.category_name ? props.yourdata.category_name : ""}

                                </button>
                            </div>
                            <div>
                                <span>
                                    <span>
                                        <img src={watchicon} alt={watchicon} />{" "}
                                    </span>{" "}
                                    {props.yourdata.created_date}
                                </span>
                            </div>
                            <div className="classiFieds_bookmarkicon">
                                <img src={bookmarkicon} alt={bookmarkicon} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="classiFieds_RupeesText ">
                {props.yourdata.amount ?
                    <p>
                        R4,000<span>PER WEEK</span>
                    </p> : ""}
            </div>
            <div className="classiFieds_countryName ">
                <span>
                    <img src={mapicon} alt={mapicon} />{" "}
                    <span>{props.yourdata.country_name},{props.yourdata.province_name},{props.yourdata.city}</span>
                </span>
            </div>
            <div className="classiFieds_aboutText">
                <p>
                    {props.yourdata.description}
                </p>
            </div>
        </div>
    );
}

export default CommonDataShow;
