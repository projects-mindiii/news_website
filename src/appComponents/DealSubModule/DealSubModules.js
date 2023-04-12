import React, { useEffect, useState } from "react";
import "../LatestDeals/LatestDeals.css";
import { Icon } from "@iconify/react";
import message from "../../assets/images/Deal_icon/message.png";
import contact from "../../assets/images/Deal_icon/contact_ico.png";
import globe from "../../assets/images/Deal_icon/globe_ico.png";
import mail from "../../assets/images/Deal_icon/mail_ico.png";
import watch from "../../assets/images/Deal_icon/watch.png";
import promotional from "../../assets/images/Deal_icon/promotional.png";

function DigitalPrint(props) {
  const [filteredList, setFilteredList] = useState(null);

  // =====here i am filtering the deal list which one need to show====
  useEffect(() => {
    function filterDeal() {
      const getFilterData = props.dealList.filter(
        (value, index) => value.id == props.eventKeyValue
      );
      getFilterData.length > 0 && setFilteredList(getFilterData[0].dealList);
      console.log("getFilterData", getFilterData);
    }
    filterDeal();
  }, [props]);
  return (
    <section>
      {filteredList
        ? filteredList.map((item, index) => (
            <div className="latestDeals" key={index}>
              <img src={item.gallery[0].img_url} alt="deals" />
              <h3>{item.name}</h3>
              <p className="dealSubText">{item.description}</p>
              <div className="dealDetails">
                <div className="detailsValue">
                  <img src={message} alt="img" />
                  <div className="dealText">
                    <span>CONTACT PERSON</span>
                    <p>{item.contact_name}</p>
                  </div>
                </div>
                {item.contact_number && (
                  <div className="detailsValue">
                    <img src={contact} alt="img" />
                    <div className="dealText">
                      <span>CONTACT PERSON</span>
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
                      <span>WEBSITE</span>
                      <p>{item.contact_web_url}</p>
                    </div>
                  </div>
                )}
                {item.contact_email && (
                  <div className="detailsValue">
                    <img src={mail} alt="img" />
                    <div className="dealText websiteUrl">
                      <span>EMAIL</span>
                      <p>{item.contact_email}</p>
                    </div>
                  </div>
                )}
                {item.deal_expire_date && (
                  <div className="detailsValue">
                    <img src={watch} alt="img" />
                    <div className="dealText">
                      <span>EXPIRY</span>
                      <p>{item.deal_expire_date}</p>
                    </div>
                  </div>
                )}
                {item.promo_code && (
                  <div className="detailsValue">
                    <img src={promotional} alt="img" />
                    <div className="dealText">
                      <span>PROMOTIONAL CODE</span>
                      <p>{item.promo_code}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="dealPrice">
                <h4>
                  {item.currency_code} {item.price}
                </h4>{" "}
                <span>{item.tax_lable}</span>
              </div>
              <button className="whatsApp">
                <Icon
                  icon="mdi:whatsapp"
                  color="white"
                  width="31.2"
                  height="31.2"
                />
                WhatsApp Me
              </button>
              <button className="viewProfile">View Company Profile</button>
            </div>
          ))
        : ""}
    </section>
  );
}

export default DigitalPrint;
