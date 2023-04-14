import { Col, Container, Nav, Row, Tab, Toast } from "react-bootstrap";
import { MdKeyboardArrowRight } from "react-icons/md";
import "./LatestDeals.css";
import "../../assets/styles/Common.css";
import DigitalPrint from "../DealSubModule/DealSubModules";
import { useEffect, useLayoutEffect, useState } from "react";
import SublyApi from "../../helpers/Api";
import CompanyProfile from "../DealSubModule/CompanyProfile";
import { useDispatch, useSelector } from "react-redux";


function LatestDeals() {
  const [eventKeyValue, setEventKeyValue] = useState(null);
  const { latestDeals, isLoading } = useSelector((state) => state.deal);

  return (
    <div className="dealContainer">
      <Container>
        <Tab.Container id="left-tabs-example" defaultActiveKey={eventKeyValue}>
          <Row>
            <Col lg={6} sm={12}>
              <Nav
                variant="pills"
                className="flex-column addTabs stickyClass"
                // defaultActiveKey={eventKeyValue}
                onSelect={(value) => {
                  setEventKeyValue(value);
                }}
              >
                <Nav.Item>
                  {latestDeals.length > 0
                    ? latestDeals.map((item, index) => (
                        <Nav.Link eventKey={item.id}>
                          {item.name} ({item.deal_count})
                          <MdKeyboardArrowRight />
                        </Nav.Link>
                      ))
                    : ""}
                </Nav.Item>
              </Nav>
            </Col>
            <Col lg={6} sm={12}>
              <Tab.Content>
                <Tab.Pane eventKey={eventKeyValue ? eventKeyValue : ""}>
                  <DigitalPrint
                    eventKeyValue={eventKeyValue}
                    dealList={latestDeals}
                  />
                  {/* <CompanyProfile/> */}
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
