import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CompanyProfile from "../DealModule/ComapnyProfile/CompanyProfile";
import { useSelector } from "react-redux";
import DealList from "../DealModule/DealList/DealList";
import SublyApi from "../../helpers/Api";
import { STATUS_CODES } from "../../utils/StatusCode";
import Loader from "../../utils/Loader/Loader";
import { useParams } from "react-router-dom";
import { COMPANY_REFERENCE_TYPE } from "../../utils/Constants";
import { useTranslation } from "react-i18next";

// -------function for view company details----------
function ViewCompanyProfile() {
  //set language
  const { t } = useTranslation();
  const [companyDetails, setcompanyDetails] = useState("");
  const { userToken } = useSelector((state) => state.user);
  const [loader, setLoader] = useState(false);
  const { id } = useParams();

  // --------function for get company details----------
  const companyValue = { id: id, refrence_id: 0, refrence_type: COMPANY_REFERENCE_TYPE.DEAL_TYPE }
  // ---refrence_id,refrence_type set 0 case when only get direct compnay data-------
  useEffect(() => {
    async function getCompanyDetails() {
      setLoader(true);
      const details = await SublyApi.companyDetails(
        userToken,
        companyValue
      );

      if (details.status_code == STATUS_CODES.SUCCESS) {
        setcompanyDetails(details.data);
        setLoader(false);
      }
    }
    getCompanyDetails();
  }, []);

  console.log("companyDetails",companyDetails)

  return (
    <section>
      <div className="dealContainer">
        {loader ? (
          <div className="loader">
            <Loader />
          </div>
        ) : null}
        <Container>
          <Row>
            <Col lg={6} sm={12}>
              <CompanyProfile companyDetailData={companyDetails} />
            </Col>
            <Col lg={6} sm={12}>
              {companyDetails.deal_list && companyDetails.deal_list.length > 0 ? <>
                {companyDetails ?
                  <>
                    {companyDetails.company_detail.banner_img && (
                      < div className="advertBox">
                        <img src={companyDetails.company_detail.banner_img} />
                      </div>
                    )}
                  </>
                  : ""}

                <DealList fromDeal={false} dealList={companyDetails.deal_list} />
              </> : <h4>{t("NO_DEAL")}</h4>}
            </Col>
          </Row>
        </Container>
      </div>
    </section >
  );
}

export default ViewCompanyProfile;
