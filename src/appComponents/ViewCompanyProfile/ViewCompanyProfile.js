import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CompanyProfile from "../DealModule/ComapnyProfile/CompanyProfile";
import { useSelector } from "react-redux";
import DealList from "../DealModule/DealList/DealList";
import SublyApi from "../../helpers/Api";
import { STATUS_CODES } from "../../utils/StatusCode";
import Loader from "../../utils/Loader/Loader";
import { useParams } from "react-router-dom";


function ViewCompanyProfile() {
  const [companyDetails, setcompanyDetails] = useState("");
  const { userToken, isLoading } = useSelector((state) => state.user);
  const { id } = useParams();

  // --------function for get company details----------
  const companyValue = { id: id, refrence_id: 0, refrence_type: 3 }
  useEffect(() => {
    async function getCompanyDetails() {
      const details = await SublyApi.companyDetails(
        userToken,
        companyValue
      );
     
      if (details.status_code == STATUS_CODES.SUCCESS) {
        setcompanyDetails(details.data);
      }
    }
    getCompanyDetails();
  }, []);
 
  

  return (

    <section>
      {isLoading === true ? (
        <Loader />
      ) : ""}
      <div className="dealContainer">
        <Container>
          <Row>
            <Col lg={6} sm={12}>
              <CompanyProfile companyDetailData={companyDetails} />
            </Col>
            <Col lg={6} sm={12}>
              <div className="advertBox">

              </div>
              <DealList fromDeal={false} dealList={companyDetails.deal_list} />
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
}

export default ViewCompanyProfile;
