import React, { useEffect, useState } from "react";
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
import SublyApi from "../../helpers/Api";
import { useSelector } from "react-redux";

function CompanyProfile() {
  const [companyDetails, setcompanyDetails] = useState("");
  const [productList, setProductList] = useState("");
  const [serviceList, setServiceList] = useState("");
  const [brandList, setBrandList] = useState("");
  const { userToken } = useSelector((state) => state.user);

  // --------function for get company details----------
  const companyValue = { id: 22, refrence_id: 0, refrence_type: 3 }
  useEffect(() => {
    async function getCompanyDetails() {
      const details = await SublyApi.companyDetails(
        userToken,
        companyValue
      );
      console.log("details", details)
      if (details.status_code == 200) {
        setcompanyDetails(details.data.company_detail);
        setProductList(details.data.product_list);
        setServiceList(details.data.service_list);
        setBrandList(details.data.brand_list);
      }
    }
    getCompanyDetails();
  }, []);

  return (
    <section>
      <div className="latestDeals companyDetails">
        <div className="companyLogo">
          <img src={companyDetails.company_logo} alt="company_img" />
        </div>
        <h3>{companyDetails.name}</h3>
        <p>{companyDetails.description}</p>

        {productList.length > 0 && (
          <>
            <h5>PRODUCTS</h5>
            {productList.length > 0 && productList.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </>
        )}

        {serviceList.length > 0 && (
          <>
            <h5>SERVICE</h5>
            {serviceList.length > 0 && serviceList.map((item1, index1) => (
              <li key={index1}>{item1.name}</li>
            ))}
          </>
        )}

        <div className="brandPrasent">
          {brandList.length > 0 && (
            <>
              <h3>BRANDS REPRESENTED</h3>
              <div className="brandType">
                {brandList.length > 0 && brandList.map((item2, index2) => (
                  <p key={index2}>{item2.name}</p>
                ))}
              </div>
            </>
          )}

          <div className="playBox">
            <img src={playBtn} alt="playBtn" />
          </div>
          <div className="detailsValue">
            <img src={mail} alt="img" />
            <div className="dealText">
              <span>EMAIL</span>
              <p>{companyDetails.email}</p>
            </div>
          </div>
          <div className="detailsValue">
            <img src={contact} alt="img" />
            <div className="dealText">
              <span>CONTACT PERSON</span>
              <p>{companyDetails.dial_code}{companyDetails.contact}</p>
            </div>
          </div>
          <div className="detailsValue">
            <img src={globe} alt="img" />
            <div className="dealText websiteUrl">
              <span>WEBSITE</span>
              <p>{companyDetails.webside_url}</p>
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
            
            <a href={companyDetails.facebook_link}><img src={item.icon_share} /></a>
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
                  class="btn-link btn-block text-left collapsed"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  BEDFORDVIEW BRANCH
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
              id="collapseOne"
              class="collapse"
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
