import { Col, Container, Nav, Row, Tab, Toast } from "react-bootstrap";
import { MdKeyboardArrowRight } from "react-icons/md";
import "./LatestDeals.css";
import "../../assets/styles/Common.css";
import Deals from "../../assets/images/Bitmap.png";
import DigitalPrint from "../DealSubModule/DealSubModules";
import { useEffect, useState } from "react";
import SublyApi from "../../helpers/Api";

function LatestDeals() {
  const [dealList, setDealList] = useState([]);
  const [eventKeyValue, setEventKeyValue] = useState(null);
  const token = localStorage.getItem("token");

  // =====Here i am calling api for getting deal list =====
  useEffect(() => {
    async function getDealList() {
      await SublyApi.getDealList(token).then((response) => {
        if (response.status_code == 200) {
          setDealList([
            ...response.data.product_deal_count_list,
            ...response.data.service_deal_count_list,
          ]);
        } else {
          Toast.fire({
            icon: "error",
            title: response.data.message,
          });
        }
      });
    }
    if (token) {
      getDealList();
    }
  }, [token]);
  console.log("dealList", dealList);
  return (
    <div className="dealContainer">
      <Container>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={6}>
              <Nav
                variant="pills"
                className="flex-column addTabs"
                onSelect={(value) => {
                  setEventKeyValue(value);
                }}
              >
                <Nav.Item>
                  {dealList.length > 0
                    ? dealList.map((item, index) => (
                        <Nav.Link eventKey={item.id}>
                          {item.name} ({item.deal_count})
                          <MdKeyboardArrowRight />
                        </Nav.Link>
                      ))
                    : ""}
                </Nav.Item>
                {/* <Nav.Item>
                  <Nav.Link eventKey="second">
                    Display Hardware(8)
                    <MdKeyboardArrowRight />
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third">
                    Large Format Printer(8)
                    <MdKeyboardArrowRight />
                  </Nav.Link>
                </Nav.Item> */}
              </Nav>
            </Col>
            <Col sm={6}>
              <Tab.Content>
                <Tab.Pane eventKey={eventKeyValue}>
                  <DigitalPrint
                    eventKeyValue={eventKeyValue}
                    dealList={dealList}
                    // dealsArray={
                    //   dealList ? dealList.product_deal_count_list[0] : ""
                    // }
                  />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </div>
  );
}
export default LatestDeals;
