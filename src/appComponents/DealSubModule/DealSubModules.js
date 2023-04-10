import React from "react";
import "../LatestDeals/LatestDeals.css";
import Deals from "../../assets/images/Bitmap.png";
import { detailsDeal } from "../LatestDeals/DealDetails";
import { Icon } from '@iconify/react';

function DigitalPrint() {
  return (
    <section>
      <div className="latestDeals">
        <img src={Deals} alt="deals" />
        <h3>DRYtech Spacial</h3>
        <p className="dealSubText">
          When adding redeem code then pop up comes their test should be written
          as "Added redeem code amount
        </p>
        <div className="dealDetails">
          {detailsDeal
            ? detailsDeal.map((item, index) => (
                <div className="detailsValue">
                  <img src={item.imgValue} alt="img" />
                  <div className="dealText">
                    <span>{item.subText}</span>
                    <p>{item.commonText}</p>
                  </div>
                </div>
              ))
            : ""}
        </div>
        <div className="dealPrice">
          <h4>ZAR 349.55</h4> <span>VAT NICL</span>
        </div>
        <button className="whatsApp">
          <Icon icon="mdi:whatsapp" color="white" width="31.2" height="31.2" />
          WhatsApp Me
        </button>
        <button className="viewProfile">View Company Profile</button>
      </div>
    </section>
  );
}

export default DigitalPrint;
