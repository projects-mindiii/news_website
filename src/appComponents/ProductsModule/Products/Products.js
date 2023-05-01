import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import styles from '../Products.module.css';
import ProductList from "../ProductList/ProductList";
import { useSelector } from "react-redux";
import { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import Loader from "../../../utils/Loader/Loader";

// -----------function for display products------------
function Products() {
    const { allDeals, isLoading } = useSelector((state) => state.deal);
    const [eventKeyValue, setEventKeyValue] = useState((allDeals.product_company_count_list && allDeals.product_company_count_list.length > 0) ? allDeals.product_company_count_list[0].id : null);

    console.log("allDeals", allDeals.product_company_count_list);

    return (
        <>
            <div className={styles.productModule}>
                {isLoading === true ? (
                    <Loader />
                ) : ""}
                {allDeals.product_company_count_list.length > 0 ?
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
                                            {allDeals.product_company_count_list.length > 0
                                                ? allDeals.product_company_count_list.map((item, index) => (
                                                    <Nav.Link key={item.id} eventKey={item.id}>
                                                        {item.name} ({item.company_count})
                                                        <MdKeyboardArrowRight />
                                                    </Nav.Link>
                                                ))
                                                : ""}
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                                <Col lg={6} sm={12}>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="first">
                                            <ProductList />
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
export default Products;