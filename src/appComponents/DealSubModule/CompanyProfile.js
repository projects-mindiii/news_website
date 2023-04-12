import React from "react";
import companyImg from "../../assets/images/reoland.png";
import playBtn from "../../assets/images/play_btn.png";
import "./DealSubModules.css";
import contact from "../../assets/images/Deal_icon/contact_ico.png";
import globe from "../../assets/images/Deal_icon/globe_ico.png";
import mail from "../../assets/images/Deal_icon/mail_ico.png";
import { Icon } from "@iconify/react";
import socialShare from "../CommonModule/CommonSocialShare";
import "../CommonModule/CommonModule.css";
import MapLocation from "../CommonModule/MapLocation";

function CompanyProfile() {
  return (
    <section>
      <div className="latestDeals companyDetails">
        <img src={companyImg} alt="company_img" />
        <h3>AGFA Graphics</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          pharetra posuere libero at luctus. In hac habitasse platea dictumst.
          Quisque venenatis posuere neque, sit amet pharetra elit lacinia vitae.
          Donec aliquet nisi ac elit egestaas vulputate. Ut vulputate, diam vel
          scelerisqs vulputate. Ut vulputate, diam vel scelerisque bibendum,
          libero nisi pharetra nunc, et facilisis dui risus nec est.
        </p>
        <h5>PRODUCTS</h5>
        <li>Large format printers</li>
        <li>Digital printer link</li>
        <h5>SERVICE</h5>
        <li>Large format printers</li>
        <li>Digital printer link</li>
        <li>Digital printer link</li>
        <div className="brandPrasent">
          <h3>BRANDS REPRESENTED</h3>
          <div className="brandType">
            <p>ROLAND</p> <p>APPLE</p> <p>MUSTEK</p>
          </div>
          <div className="playBox">
            <img src={playBtn} alt="playBtn" />
          </div>
          <div className="detailsValue">
            <img src={mail} alt="img" />
            <div className="dealText">
              <span>EMAIL</span>
              <p>Abhishek@gmail.com</p>
            </div>
          </div>
          <div className="detailsValue">
            <img src={contact} alt="img" />
            <div className="dealText">
              <span>CONTACT PERSON</span>
              <p>+123456789</p>
            </div>
          </div>
          <div className="detailsValue">
            <img src={globe} alt="img" />
            <div className="dealText websiteUrl">
              <span>WEBSITE</span>
              <p>WWW.mindiii.com</p>
            </div>
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
        </div>
        <div className="socialShare">
          {socialShare.map((item, index) => (
            <img src={item.icon_share} />
          ))}
        </div>
        <div className="mapClass">
          <MapLocation />
        </div>
        <div class="accordion mapAccordion" id="accordionExample">
        <div class="card">
          <div class="card-header" id="headingOne">
            <h2 class="mb-0">
              <button
                class="btn btn-link btn-block text-left"
                type="button"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                BEDFORDVIEW BRANCH
              </button>
            </h2>
          </div>

          <div
            id="collapseOne"
            class="collapse show"
            aria-labelledby="headingOne"
            data-parent="#accordionExample"
          >
            <div class="card-body">
            <MapLocation />
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CompanyProfile;
