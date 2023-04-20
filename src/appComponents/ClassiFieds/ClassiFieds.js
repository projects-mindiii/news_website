import "./ClassiFieds.css";
import { Row, Nav, Container, Col, Tab } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import bookmarkicon from "../../assets/images/bookmark_ico.png";
import mapicon from "../../assets/images/map_ico.png";
import forsale from "../../assets/images/for_sale_img.png";
import watchicon from "../../assets/images/watch_ico.png";
import newsadd1 from "../../assets/images/news_image.png";
import newsadd2 from "../../assets/images/news_image2.png";
import { Icon } from "@iconify/react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";

import SublyApi from "../../helpers/Api";
import WhatsApp from "../../CommonComponent/Whatappshare";
import SocialMedaiShare from "../../CommonComponent/SocialMediaShare";
import ContactPerson from "../../CommonComponent/ContactPerson";
import { useSelector } from "react-redux";
import ClassifiedCategoryList from "./ClassifiedCategoryList";

//-------Create a Deals Header component--------
function ClassiFieds() {
  const { userToken, currentUser, isLoading } = useSelector(
    (state) => state.user
  );
  const [CatergoryType, setCategoryType] = useState("");
  const [CatergoryTypeIndex, setCategoryTypeIndex] = useState(0);
  const [CountryName, setCountryName] = useState("");
  const [shown, setShown] = useState(false);

  useEffect(() => {
    async function getClassifiedLists() {
      let requestData = new FormData();
      requestData.append("limit", "");
      requestData.append("offset", "");
      requestData.append("type", 4);
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
  //Adverties image
  // const imagearray = [
  //   { image: newsadd1 },
  //   { image: newsadd2 },
  //   { image: newsadd1 },
  //   { image: newsadd2 },
  // ];
  return (
    <div className="main">
      <React.Fragment>
        <Container>
          <Row>
            <Col xs={12} sm={12} md={12} lg={6}>
              <div className="categoryButton">
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="first">FOR SALE (4)</Nav.Link>
                      {shown ? (
                        <MdKeyboardArrowDown
                          onClick={() => setShown(!shown)}
                          icon="ic:baseline-keyboard-arrow-down"
                          width="24"
                          height="24"
                          color="white"
                        />
                      ) : (
                        <MdKeyboardArrowUp
                          onClick={() => setShown(!shown)}
                          icon="ic:baseline-keyboard-arrow-down"
                          width="24"
                          height="24"
                          color="white"
                        />
                      )}
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">WANTED (2)</Nav.Link>
                      {shown ? (
                        <MdKeyboardArrowDown
                          onClick={() => setShown(!shown)}
                          icon="ic:baseline-keyboard-arrow-down"
                          width="24"
                          height="24"
                          color="white"
                        />
                      ) : (
                        <MdKeyboardArrowUp
                          onClick={() => setShown(!shown)}
                          icon="ic:baseline-keyboard-arrow-down"
                          width="24"
                          height="24"
                          color="white"
                        />
                      )}
                    </Nav.Item>
                  </Nav>
                </Tab.Container>
              </div>
            </Col>

            <ClassifiedCategoryList />

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
