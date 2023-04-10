import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import { MdKeyboardArrowRight } from "react-icons/md";
import "./LatestDeals.css";
import "../../assets/styles/Common.css";
import Deals from "../../assets/images/Bitmap.png";
import { detailsDeal } from "./DealDetails";
import DigitalPrint from "../DealSubModule/DealSubModules";
import { useEffect, useState } from "react";
import SublyApi from "../../helpers/Api";

function LatestDeals() {
  const [dealList, setDealList] = useState(null);
  const token = localStorage.getItem("token");

  // =====Here i am calling api for getting deal list =====
  useEffect(() => {
    async function getDealList() {
     await SublyApi.getDealList(token).then((response) => {
        if (response.status_code == 200) {
          setDealList(response.data);
        }
      });
    }
    getDealList();
  }, []);

  return (
    <div className="dealContainer">
      <Container>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={6}>
              <Nav variant="pills" className="flex-column addTabs">
                <Nav.Item>
                  <Nav.Link eventKey="first">
                    Digital Print Media (
                    {dealList && dealList.company_deal_count_list.length})
                    <MdKeyboardArrowRight />
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
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
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={6}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <DigitalPrint
                    dealsArray={
                      dealList ? dealList.company_deal_count_list : ""
                    }
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <div className="latestDeals">
                    <img src={Deals} alt="deals" />
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  <div className="latestDeals">
                    <img src={Deals} alt="deals" />
                  </div>
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
