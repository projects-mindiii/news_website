import "../LatestDealList/LatestDealList.css";
import contact from "../../../assets/images/Deal_icon/contact_ico.png";
import globe from "../../../assets/images/Deal_icon/globe_ico.png";
import mail from "../../../assets/images/Deal_icon/mail_ico.png";
import "../../CommonModule/CommonModule.css";
import MapLocation from "../../CommonModule/MapLocation";
import insta from "../../../assets/images/socialMedia_icon/insta_black_ico.png";
import facebook from "../../../assets/images/socialMedia_icon/facebook_ico.png";
import linkedin from "../../../assets/images/socialMedia_icon/linkedin_black_ico.png";
import youtube from "../../../assets/images/socialMedia_icon/youtube_play_ico.png";
import twitter from "../../../assets/images/socialMedia_icon/twitter_ico.png";
import { useTranslation } from "react-i18next";
import WhatsApp from "../../../CommonComponent/Whatappshare";
import ReactPlayer from 'react-player';
import AddressFields from "../../CommonModule/AddressFields";


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

            {companyDetailData.vedio_list.length > 0 && (
              <>
                <div className="brandType">
                  {companyDetailData.vedio_list.length > 0 && companyDetailData.vedio_list.map((item, index) => (
                    <ReactPlayer
                      className="playBox"
                      url={item.image}
                      playing={true}
                      controls={true}
                    />
                  ))}
                </div>
              </>
            )}

            <div className="dealDetailsList">
              {companyDetailData.company_detail.email && (
                <div className="detailsValue">
                  <img src={mail} alt="img" />
                  <div className="dealText">
                    <span>{t("EMAIL_TEXT")}</span>
                    <p>{companyDetailData.company_detail.email}</p>
                  </div>
                </div>
              )}

              {companyDetailData.company_detail.contact && (
                <div className="detailsValue">
                  <img src={contact} alt="img" />
                  <div className="dealText">
                    <span>{t("CONTACT_PERSON")}</span>
                    <p>{companyDetailData.company_detail.dial_code}{companyDetailData.company_detail.contact}</p>
                  </div>
                </div>
              )}

              {companyDetailData.company_detail.webside_url && (
                <div className="detailsValue">
                  <img src={globe} alt="img" />
                  <div className="dealText websiteUrl">
                    <span>{t("WEBSITE")}</span>
                    <p>{companyDetailData.company_detail.webside_url}</p>
                  </div>
                </div>
              )}

            </div>

            {companyDetailData.company_detail.whatapp_contact_number && (
              <div className="watsappCls">
                <WhatsApp watsApp={false} />
              </div>)}

          </div>
          <div className="socialShare">
            {companyDetailData.company_detail.facebook_link && (
              <a href={companyDetailData.company_detail.facebook_link}><img src={facebook} /></a>
            )}
            {companyDetailData.company_detail.twitter_link && (
              <a href={companyDetailData.company_detail.twitter_link}><img src={twitter} /></a>
            )}
            {companyDetailData.company_detail.instagrame_link && (
              <a href={companyDetailData.company_detail.instagrame_link}><img src={insta} /></a>
            )}
            {companyDetailData.company_detail.linkedin_link && (
              <a href={companyDetailData.company_detail.linkedin_link}><img src={linkedin} /></a>
            )}
            {companyDetailData.company_detail.youtube_link && (
              <a href={companyDetailData.company_detail.youtube_link}><img src={youtube} /></a>
            )}
          </div>

          <div className="mapClass">
            <MapLocation address={companyDetailData.company_detail.address} />
          </div>

          <AddressFields addressSet={companyDetailData.branch_list} />

        </div>
        : ""}
    </section>
  );
}

export default CompanyProfile;
