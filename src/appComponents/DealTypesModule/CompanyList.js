import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import styles from './CompanyData.module.css';
import { MdKeyboardArrowRight } from "react-icons/md";
import { useState } from "react";
import CompanyData from "./CompanyData";
import CompanyOrderType from "./CompaniesOrderType";
import { useLocation } from "react-router-dom";
import Loader from "../../utils/Loader/Loader";
import { REFERENCE_TYPE } from "../../utils/Constants";
import { useTranslation } from "react-i18next";


// -----------function for display companies of products,services and brands------------
function CompanyList({ companyList, refrenceType }) {
    //set language
    const { t } = useTranslation();
    const location = useLocation();
    const [eventKeyValue, setEventKeyValue] = useState((companyList && companyList.length > 0) ? companyList[0].id : null);

    return (
        <>
            {companyList ?
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
                                                            {item.name} {(item.company_count !== 'company_order') ? '(' + item.company_count + ')' : ""}
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
                                                {location.pathname == "/deals/products" ||
                                                    location.pathname == "/deals/services" || location.pathname == "/deals/brands" ? (
                                                    <CompanyData
                                                        referenceId={eventKeyValue}
                                                        refrenceType={refrenceType}
                                                    />
                                                ) : (
                                                    <CompanyOrderType companyList={eventKeyValue} />
                                                )}
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Col>
                                </Row>
                            </Tab.Container>
                        </Container>

                        : <>
                            {refrenceType == REFERENCE_TYPE.PRODUCTS && <h4>{t("NO_PRODUCT")}</h4>}
                            {refrenceType == REFERENCE_TYPE.SERVICES && <h4>{t("NO_SERVICE")}</h4>}
                            {refrenceType == REFERENCE_TYPE.BRANDS && <h4>{t("NO_BRAND")}</h4>}
                        </>

                    }
                </div> : <Loader />}
        </>
    );
}
export default CompanyList;