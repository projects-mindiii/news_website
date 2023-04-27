import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import { MdKeyboardArrowRight } from "react-icons/md";
import "./LatestDeals.css";
import "../../../assets/styles/Common.css";
import LatestDealList from "../LatestDealList/LatestDealList";
import { useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../../../utils/Loader/Loader";

function LatestDeals() {
  const { latestDeals, isLoading } = useSelector((state) => state.deal);
  const [eventKeyValue, setEventKeyValue] = useState((latestDeals && latestDeals.length > 0) ? latestDeals[0].id : null);

  return (
    <div className="dealContainer">
      {isLoading === true ? (
        <Loader />
      ) : ""}
      <Container>
        {latestDeals ?
          <Tab.Container id="left-tabs-example" defaultActiveKey={eventKeyValue}>
            <Row>
              <Col lg={6} sm={12}>
                <Nav
                  variant="pills"
                  className="flex-column addTabs stickyClass"
                  onSelect={(value) => {
                    setEventKeyValue(value);
                  }}
                >
                  <Nav.Item>
                    {latestDeals.length > 0
                      ? latestDeals.map((item, index) => (
                        <Nav.Link key={item.id} eventKey={item.id}>
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
                    <LatestDealList
                      eventKeyValue={eventKeyValue}
                      dealList={latestDeals}
                    />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container> :
          <h4>--- NO DEALS TO DISPLAY ---</h4>}
      </Container>
    </div>
  );
}
export default LatestDeals;
