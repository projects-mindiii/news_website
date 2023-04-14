import React from "react";
import { Col, Container, Nav, Row, Tab, Toast } from "react-bootstrap";
import CompanyProfile from "../DealSubModule/CompanyProfile";
import DigitalPrint from "../DealSubModule/DealSubModules";
import { useDispatch, useSelector } from "react-redux";

function ViewCompanyProfile() {
  const { latestDeals, isLoading } = useSelector((state) => state.deal);

  return (
    <section>
      <div className="dealContainer">
        <Container>
          <Row>
            <Col lg={6} sm={12}>
              <CompanyProfile />
            </Col>
            <Col lg={6} sm={12}>
              <DigitalPrint eventKeyValue={17} dealList={latestDeals} />
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
}

export default ViewCompanyProfile;
