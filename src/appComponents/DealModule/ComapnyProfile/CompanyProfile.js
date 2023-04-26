import playBtn from "../../../assets/images/play_btn.png";
import "../LatestDealList/LatestDealList.css";
import contact from "../../../assets/images/Deal_icon/contact_ico.png";
import globe from "../../../assets/images/Deal_icon/globe_ico.png";
import mail from "../../../assets/images/Deal_icon/mail_ico.png";
import { Icon } from "@iconify/react";
import "../../CommonModule/CommonModule.css";
import MapLocation from "../../CommonModule/MapLocation";
import insta from "../../../assets/images/socialMedia_icon/insta_black_ico.png";
import facebook from "../../../assets/images/socialMedia_icon/facebook_ico.png";
import linkedin from "../../../assets/images/socialMedia_icon/linkedin_black_ico.png";
import youtube from "../../../assets/images/socialMedia_icon/youtube_play_ico.png";
import twitter from "../../../assets/images/socialMedia_icon/twitter_ico.png";
import { useTranslation } from "react-i18next";
import WhatsApp from "../../../CommonComponent/Whatappshare";
import Loader from "../../../utils/Loader/Loader";


function CompanyProfile({ companyDetailData }) {
  //set language
  const { t } = useTranslation();

  return (
    <section>
      {companyDetailData ?


        <div className="latestDeals companyDetails">
        
          <div className="companyLogo">
            <img src={companyDetailData.company_detail.company_logo} alt="company_img" />
          </div>
          <h3>{companyDetailData.company_detail.name}</h3>
          <p>{companyDetailData.company_detail.description}</p>

          {companyDetailData.product_list.length > 0 && (
            <>
              <h5>{t("PRODUCTS")}</h5>
              {companyDetailData.product_list.length > 0 && companyDetailData.product_list.map((item, index) => (
                <li key={index}>{item.name}</li>
              ))}
            </>
          )}

          {companyDetailData.service_list.length > 0 && (
            <>
              <h5>{t("SERVICES")}</h5>
              {companyDetailData.service_list.length > 0 && companyDetailData.service_list.map((item1, index1) => (
                <li key={index1}>{item1.name}</li>
              ))}
            </>
          )}

          <div className="brandPrasent">
            {companyDetailData.brand_list.length > 0 && (
              <>
                <h3>{t("BRAND_REPRESENT")}</h3>
                <div className="brandType">
                  {companyDetailData.brand_list.length > 0 && companyDetailData.brand_list.map((item2, index2) => (
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
                <span>{t("EMAIL_TEXT")}</span>
                <p>{companyDetailData.company_detail.email}</p>
              </div>
            </div>
            <div className="detailsValue">
              <img src={contact} alt="img" />
              <div className="dealText">
                <span>{t("CONTACT_PERSON")}</span>
                <p>{companyDetailData.company_detail.dial_code}{companyDetailData.company_detail.contact}</p>
              </div>
            </div>
            <div className="detailsValue">
              <img src={globe} alt="img" />
              <div className="dealText websiteUrl">
                <span>{t("WEBSITE")}</span>
                <p>{companyDetailData.company_detail.webside_url}</p>
              </div>
            </div>
            <button className="whatsApp">
              <Icon
                icon="mdi:whatsapp"
                color="white"
                width="31.2"
                height="31.2"
              />
              {t("WHATSAPP_ME")}
            </button>
            {/* <div className="watsappCls">
            <WhatsApp/>
            </div> */}
          </div>
          <div className="socialShare">
            {/* {socialShare.map((item, index) => (

            <a href={companyDetails.facebook_link}><img src={item.icon_share} /></a>
          ))} */}

            <a href={companyDetailData.company_detail.facebook_link}><img src={facebook} /></a>
            <a href={companyDetailData.company_detail.twitter_link}><img src={twitter} /></a>
            <a href={companyDetailData.company_detail.instagrame_link}><img src={insta} /></a>
            <a href={companyDetailData.company_detail.linkedin_link}><img src={linkedin} /></a>
            <a href={companyDetailData.company_detail.youtube_link}><img src={youtube} /></a>
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
                    {t("BEDFORD_BRANCH")}
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
        : ""}
    </section>
  );
}

export default CompanyProfile;
