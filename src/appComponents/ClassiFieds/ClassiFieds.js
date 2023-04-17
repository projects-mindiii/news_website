import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./ClassiFieds.css";
import { Row, Container, Col } from "react-bootstrap";
import React, { useEffect } from "react";
import bookmarkicon from "../../assets/images/bookmark_ico.png"
import mapicon from "../../assets/images/map_ico.png"
import forsale from "../../assets/images/for_sale_img.png"
import watchicon from "../../assets/images/watch_ico.png"
import newsadd1 from "../../assets/images/news_image.png"
import newsadd2 from "../../assets/images/news_image2.png"
import { Icon } from '@iconify/react';
import SublyApi from "../../helpers/Api";
import WhatsApp from "../../CommonComponent/Whatappshare";
import SocialMedaiShare from "../../CommonComponent/SocialMediaShare";
import ContactPerson from "../../CommonComponent/ContactPerson";
//-------Create a Deals Header component--------
function ClassiFieds() {
    const token = localStorage.getItem("tokens");
   
    //set language
    const imagearray = [{ image: newsadd1 }, { image: newsadd2 }, { image: newsadd1 }, { image: newsadd2 }]
    return (
        <React.Fragment >
            <Container >
                <Row >
                    <Col xs={12} sm={12} md={12} lg={6}>
                        <div className="classiFieds_forSaledropdown">
                            <button><div>FOR SALE (4)</div><div><Icon icon="ic:outline-keyboard-arrow-down" width="24" height="24" />
                            </div></button>
                        </div>
                        <div className="classiFieds_wanteddropdown">
                            <button><div>WANTED (2)</div><div><Icon icon="ic:outline-keyboard-arrow-down" width="24" height="24" /></div></button>
                        </div>
                        <div className="classiFieds_forSaleBox">
                            <div className="classiFieds_forSale_about">
                                <div className="classiFieds_forSale" >
                                    <img src={forsale} alt={forsale} />
                                </div>
                                <div className="classiFields_heading">
                                    <p className="text">ROLAND SV450 PRINT AND CUT SENIOR PRINT ROOM MANAGER </p>
                                    <div className="classiFieds_time_action">
                                        <div className="classiFieds_time" >
                                            <button className="classiFieds_forSale_button">
                                                FOR SALE
                                            </button>
                                            <span>
                                                <span><img src={watchicon} alt={watchicon} /> </span>  23 jan 2022
                                            </span>
                                        </div>
                                        <div className="classiFieds_bookmarkicon">
                                            <img src={bookmarkicon} alt={bookmarkicon} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="classiFieds_RupeesText ">
                                <p>R4,000<small>PER WEEK</small></p>
                            </div>
                            <div className="classiFieds_countryName ">
                                <span><img src={mapicon} alt={mapicon} />  <span>South Africa, Westen Cape, Bedfordview</span></span>
                            </div>
                            <div className="classiFieds_aboutText">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pharetra posuere libero at luctus. In hac habitasse platea dictumst. Quisque venenatis posuere neque, sit amet pharetra elit lacinia vitae.</p>
                            </div>
                            <ContactPerson />
                            <WhatsApp />
                            <SocialMedaiShare />
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={1}></Col>
                    <Col xs={12} sm={12} md={12} lg={5}>
                        {imagearray.map((item, index) => (
                            <div className="classiFields_advertise">
                                <img src={item.image} alt={item.image} />
                            </div>))}
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
}
export default ClassiFieds;