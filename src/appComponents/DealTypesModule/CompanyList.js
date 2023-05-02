import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import styles from './CompanyData.module.css';
import { MdKeyboardArrowRight } from "react-icons/md";
import { useState } from "react";
import CompanyData from "./CompanyData";

// -----------function for display companies of products,services and brands------------
function CompanyList({ companyList, refrenceType }) {
    console.log("companyList",companyList)
    const [eventKeyValue, setEventKeyValue] = useState((companyList && companyList.length > 0) ? companyList[0].id : null);

    return (
        <>
            <div className={styles.productModule}>
                {companyList.length > 0 ?
                    <Container>
                        <Tab.Container id="left-tabs-example" defaultActiveKey={eventKeyValue}>
                            <Row>
                                <Col lg={6} sm={12}>
                                    <Nav variant="pills"
                                        className="flex-column addTabs stickyClass"
                                        onSelect={(value) => {
                                            setEventKeyValue(value);
                                        }}>
                                        <Nav.Item>
                                            {companyList.length > 0
                                                ? companyList.map((item, index) => (
                                                    <Nav.Link key={item.id} eventKey={item.id}>
                                                        {item.name} {(item.company_count!=='company_order')?'('+item.company_count+')':""} 
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
                                            <CompanyData
                                                referenceId={eventKeyValue}
                                                refrenceType={refrenceType}
                                            />
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </Container>

                    : <h4>--- NO PRODUCTS TO DISPLAY ---</h4>
                }
            </div>
        </>
    );
}
export default CompanyList;