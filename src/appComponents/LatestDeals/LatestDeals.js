import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import { MdKeyboardArrowRight } from "react-icons/md";
import "./LatestDeals.css";
import "../../assets/styles/Common.css";
import Deals from "../../assets/images/Bitmap.png";

function LatestDeals() {
    return (
        <div className="addTabs">
            <Container>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first" >
                    <Row>
                        <Col sm={6}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">Digital Print Media(8)
                                        <MdKeyboardArrowRight />
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Display Hardware(8)
                                        <MdKeyboardArrowRight />
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="third">Large Format Printer(8)
                                        <MdKeyboardArrowRight />
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={6}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <div className="latestDeals">
                                        <img src={Deals} alt="deals" />
                                    </div>
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