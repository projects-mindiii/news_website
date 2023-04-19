import "./ClassiFieds.css";
import { Row, Container, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import bookmarkicon from "../../assets/images/bookmark_ico.png";
import mapicon from "../../assets/images/map_ico.png";
import forsale from "../../assets/images/for_sale_img.png";
import watchicon from "../../assets/images/watch_ico.png";
import newsadd1 from "../../assets/images/news_image.png";
import newsadd2 from "../../assets/images/news_image2.png";
import { Icon } from "@iconify/react";
import SublyApi from "../../helpers/Api";
import WhatsApp from "../../CommonComponent/Whatappshare";
import SocialMedaiShare from "../../CommonComponent/SocialMediaShare";
import ContactPerson from "../../CommonComponent/ContactPerson";
import { useSelector } from "react-redux";

//-------Create a Deals Header component--------
function ClassiFieds() {
  const { userToken, currentUser, isLoading } = useSelector(
    (state) => state.user
  );
  const [CatergoryType, setCategoryType] = useState("");
  const [CatergoryTypeIndex, setCategoryTypeIndex] = useState(0);
  const [CountryName, setCountryName] = useState("");

  useEffect(() => {
    async function getClassifiedLists() {
      let requestData = new FormData();
      requestData.append("limit", "");
      requestData.append("offset", "");
      requestData.append("type", 6);
      requestData.append("search_by", 1);
      requestData.append("province", 931);
      requestData.append("country", 15);
      requestData.append("city", "Free State");
      await SublyApi.getClassiFiedMeta(userToken).then((responsejson) => {
        if (responsejson.status_code == 500) {
        } else if (responsejson.status_code == 400) {
        } else {
          if (responsejson.status_code == 200) {
            setCategoryType(responsejson.data.category_type);
            setCountryName(responsejson.data.provinces);
          }
        }
      });
      // SublyApi.getClassifiedList(requestData, userToken).then((responsejson) => {
      // });
    }
    getClassifiedLists();
  }, []);
  console.log(CatergoryType);
  console.log(CountryName);
  //set language
  const imagearray = [
    { image: newsadd1 },
    { image: newsadd2 },
    { image: newsadd1 },
    { image: newsadd2 },
  ];
  return (
    <div className="main">
      <React.Fragment>
        <Container>
          <Row>
            <Col xs={12} sm={12} md={12} lg={6}>
              {CatergoryType &&
                CatergoryType.map((item, index) => (
                  <div
                    className="classiFieds_forSaledropdown"
                    onClick={() => setCategoryTypeIndex(index)}
                  >
                    <button
                      style={{
                        backgroundColor:
                          index == CatergoryTypeIndex ? "#EC4624" : "#DFDFDF",
                        color: index == CatergoryTypeIndex ? "white" : "black",
                      }}
                    >
                      <div>{item.name}(4)</div>
                      <div>
                        {index == CatergoryTypeIndex ? (
                          <Icon
                            icon="ic:baseline-keyboard-arrow-down"
                            width="24"
                            height="24"
                            color="white"
                          />
                        ) : (
                          <Icon
                            icon="ic:baseline-keyboard-arrow-up"
                            width="24"
                            height="24"
                          />
                        )}
                      </div>
                    </button>
                  </div>
                ))}
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec pharetra posuere libero at luctus. In hac habitasse
                    platea dictumst. Quisque venenatis posuere neque, sit amet
                    pharetra elit lacinia vitae.
                  </p>
                </div>
                <ContactPerson />
                <WhatsApp />
                <SocialMedaiShare />
              </div>
            </Col>
           
            {/* <Col xs={12} sm={12} md={12} lg={5}>
              <div className="advertisment">
                {imagearray.map((item, index) => (
                  <div className="classiFields_advertise">
                    <img src={item.image} alt={item.image} />
                  </div>
                ))}
              </div>
            </Col> */}
          </Row>
        </Container>
      </React.Fragment>
    </div>
  );
}
export default ClassiFieds;
