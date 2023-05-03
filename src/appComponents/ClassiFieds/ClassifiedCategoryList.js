import mapicon from "../../assets/images/map_ico.png";
import React from "react";
import { Row, Col } from "react-bootstrap";
import "../ClassiFieds/ClassiFieds.css";
import WhatsApp from "../../CommonComponent/Whatappshare";
import SocialMedaiShare from "../../CommonComponent/SocialMediaShare";
import ContactPerson from "../../CommonComponent/ContactPerson";
import bookmarkicon from "../../assets/images/bookmark_ico.png";
import watchicon from "../../assets/images/watch_ico.png";
import { useTranslation } from "react-i18next";


function ClassifiedCategoryList({ forSaleListData}) {
  const { t } = useTranslation();
  return (
    <div className="main">
      {forSaleListData.length > 0 &&
        forSaleListData.map((item, index) => { 
          return (
            <Row key={index}>
              <Col xs={12} sm={12} md={12} lg={6}>
                <div className="classiFieds_forSaleBox">
                  <div className="classiFieds_forSale_about">
                    <div className="classiFieds_forSale">
                      <img src={item.img_url} alt={item.img_url} />
                    </div>
                    <div className="classiFields_heading">
                      <p className="text">{item.heading}</p>
                      <div className="classiFieds_time_action">
                        <div className="classiFieds_time">
                          <button
                            className="classiFieds_forSale_button"
                            style={{
                              background: `linear-gradient(to right, ${item.color_code.start_color}, ${item.color_code.end_color})`,
                              color: `text-color(to text color, ${item.color_code.text_color})`,
                            }}
                          >
                            {item.category_name}
                          </button>

                          <span>
                            <span>
                              <img src={watchicon} alt={watchicon} />{" "}
                            </span>{" "}
                            {item.created_date}
                          </span>
                        </div>
                        <div className="classiFieds_bookmarkicon">
                          <img src={bookmarkicon} alt={bookmarkicon} />
                        </div>
                      </div>
                    </div>
                  </div>
                 
                   {item.category_type_id == 6 || item.category_type_id==7?(
                    <div className="jobType">
                    <p>{(item.job_type_name)?item.job_type_name+`-`:"" }{item.job_location_type_name}</p>
                   </div>

                  ): ""}
                 

                  {item.category_type_id == 4 ||  item.category_type_id == 6? (
                    <div className="classiFieds_RupeesText">
                      <p>
                        {item.currency_code} {new Intl.NumberFormat().format(item.amount)}
                      </p>
                      <span>{(item.category_type_id == 6)?item.earning_name:item.currency_name} {(item.is_negotiable)?"(Negotiable)":""}</span>
                    </div>
                  ): ""}

                  <div className="classiFieds_countryName ">
                    <span>
                      <img src={mapicon} alt={mapicon} />{" "}
                      <span>
                        {" "}
                        {item.country_name}, {item.province_name}, {item.city}
                      </span>
                    </span>
                  </div>
                  <div className="classiFieds_aboutText">
                    <p>{item.description}</p>
                  </div>
                  <div className="classiFields_contactPerson">
                    <ContactPerson
                      forSaleListData={forSaleListData}
                      index={index}
                    />
                    {item.whatapp_contact_number.length > 0 && <WhatsApp watsApp={true}/> }
                  </div>

                  <SocialMedaiShare />
                </div>
              </Col>
             
            </Row>
          );
        })}
    </div>
  );
}

export default ClassifiedCategoryList;
