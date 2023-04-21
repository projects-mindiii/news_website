import mapicon from "../../assets/images/map_ico.png";
import { Row, Col} from "react-bootstrap";
import "../ClassiFieds/ClassiFieds.css";
import WhatsApp from "../../CommonComponent/Whatappshare";
import SocialMedaiShare from "../../CommonComponent/SocialMediaShare";
import ContactPerson from "../../CommonComponent/ContactPerson";
import bookmarkicon from "../../assets/images/bookmark_ico.png";
import forsale from "../../assets/images/for_sale_img.png";
import watchicon from "../../assets/images/watch_ico.png";


function ClassifiedCategoryList() {
  return (
    <div className="main">
      <Row>
        <Col xs={12} sm={12} md={12} lg={6}>
          <div className="classiFieds_forSaleBox">
            <div className="classiFieds_forSale_about">
              <div className="classiFieds_forSale">
                <img src={forsale} alt={forsale} />
              </div>
              <div className="classiFields_heading">
                <p className="text">
                  ROLAND SV450 PRINT AND CUT SENIOR PRINT ROOM MANAGER{" "}
                </p>
                <div className="classiFieds_time_action">
                  <div className="classiFieds_time">
                    <button className="classiFieds_forSale_button">
                      FOR SALE
                    </button>
                    <span>
                      <span>
                        <img src={watchicon} alt={watchicon} />{" "}
                      </span>{" "}
                      23 jan 2022
                    </span>
                  </div>
                  <div className="classiFieds_bookmarkicon">
                    <img src={bookmarkicon} alt={bookmarkicon} />
                  </div>
                </div>
              </div>
            </div>
            <div className="classiFieds_RupeesText ">
              <p>
                R4,000<span>PER WEEK</span>
              </p>
            </div>
            <div className="classiFieds_countryName ">
              <span>
                <img src={mapicon} alt={mapicon} />{" "}
                <span>South Africa, Westen Cape, Bedfordview</span>
              </span>
            </div>
            <div className="classiFieds_aboutText">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                pharetra posuere libero at luctus. In hac habitasse platea
                dictumst. Quisque venenatis posuere neque, sit amet pharetra
                elit lacinia vitae.
              </p>
            </div>
            <ContactPerson />
            <WhatsApp />
            <SocialMedaiShare />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ClassifiedCategoryList;
