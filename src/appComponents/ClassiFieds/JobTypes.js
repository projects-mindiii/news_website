import "./ClassiFieds.css";
import { Row, Nav, Container, Col, Tab } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { useSelector } from "react-redux";
import ClassifiedCategoryList from "./ClassifiedCategoryList";
import {
  setClassfiedType,
  getJobOfferListApi,
  getJobSeekerListApi,
} from "../../store/slices/ClassifiedSlice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import Loader from "../../utils/Loader/Loader";
import { CLASSIFIED_CATEGORY_TYPE, BOOK_TYPE } from "../../utils/Constants";

//-------Create a Deals Header component--------
function JobTypes() {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const {
    classifiedType,
    jobOfferTotalCount,
    jobOfferWebList,
    jobSeekerTotalCount,
    jobSeekerWebList,
  } = useSelector((state) => state.classified);
  const { userToken, isLoading } = useSelector((state) => state.user);
  const [showDefaultList, setShowDefaultList] = useState(1);
  const [updateList, setUpdateList] = useState(null)

  // function for classified webList
  const setClassfiedTypeValue = (value) => {
    dispatch(setClassfiedType(value));
  };
  useEffect(() => {
    setClassfiedTypeValue(CLASSIFIED_CATEGORY_TYPE.JOBOFFER);
    async function getWebClassifiedLists() {
      const jobOfferQuery = {
        limit: 10,
        offset: 0,
        type: CLASSIFIED_CATEGORY_TYPE.JOBOFFER,
      };
      const jobOfferData = { userToken: userToken, whereQuery: jobOfferQuery };
      dispatch(getJobOfferListApi(jobOfferData)).then((responsejson) => {
      });

      const jobSeekerQuery = {
        limit: 10,
        offset: 0,
        type: CLASSIFIED_CATEGORY_TYPE.JOBSEEKERS,
      };
      const jobSeekerData = {
        userToken: userToken,
        whereQuery: jobSeekerQuery,
      };
      dispatch(getJobSeekerListApi(jobSeekerData)).then((responsejson) => {
      });
    }
    getWebClassifiedLists();
  }, [updateList]);
  return (
    <div className="main">
      {isLoading === true ? <Loader /> : ""}
      <React.Fragment>
        <Container>
          <Row>
            <Col xs={12} sm={12} md={12} lg={6}>
              <div className="categoryButton">
                <Tab.Container
                  id="left-tabs-example"
                  defaultActiveKey={1}
                  onSelect={(value) => setShowDefaultList(value)}
                >
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link
                        onClick={() =>
                          setClassfiedTypeValue(
                            CLASSIFIED_CATEGORY_TYPE.JOBOFFER
                          )
                        }
                        eventKey={1}
                      >
                        {t("JOB_OFFERS")}({jobOfferTotalCount})
                      </Nav.Link>
                      {showDefaultList == 1 ? (
                        <MdKeyboardArrowDown
                          icon="ic:baseline-keyboard-arrow-down"
                          width="24"
                          height="24"
                          color="white"
                        />
                      ) : (
                        <MdKeyboardArrowUp
                          icon="ic:baseline-keyboard-arrow-down"
                          width="24"
                          height="24"
                          color="black"
                        />
                      )}
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        onClick={() =>
                          setClassfiedTypeValue(
                            CLASSIFIED_CATEGORY_TYPE.JOBSEEKERS
                          )
                        }
                        eventKey={2}
                      >
                        {t("JOB_SEEKER")} ({jobSeekerTotalCount})
                      </Nav.Link>
                      {showDefaultList == 2 ? (
                        <MdKeyboardArrowDown
                          icon="ic:baseline-keyboard-arrow-down"
                          width="24"
                          height="24"
                          color="white"
                        />
                      ) : (
                        <MdKeyboardArrowUp
                          icon="ic:baseline-keyboard-arrow-down"
                          width="24"
                          height="24"
                          color="black"
                        />
                      )}
                    </Nav.Item>
                  </Nav>
                </Tab.Container>
              </div>
              {showDefaultList == 1 ? (
                jobOfferWebList.length > 0 ? (
                  <ClassifiedCategoryList
                    forSaleListData={jobOfferWebList}
                    classifiedDataType={CLASSIFIED_CATEGORY_TYPE.JOBOFFER}
                    bookType={BOOK_TYPE.CLASSIFIED}
                    setUpdateList={setUpdateList}
                  />
                ) : (
                  <p className="nodataDisplay">
                    -- {t("N0CLASSIFIED_DISPLAY")} --{" "}
                  </p>
                )
              ) : jobSeekerWebList.length ? (
                <ClassifiedCategoryList
                  forSaleListData={jobSeekerWebList}
                  classifiedDataType={CLASSIFIED_CATEGORY_TYPE.JOBSEEKERS}
                  bookType={BOOK_TYPE.CLASSIFIED}
                  setUpdateList={setUpdateList}
                />
              ) : (
                <p className="nodataDisplay">
                  -- {t("N0CLASSIFIED_DISPLAY")} --{" "}
                </p>
              )}
            </Col>
            {/* <Col xs={12} sm={12} md={12} lg={5}>
              <div className="advertisment">
                <iframe src="https://www.signafrica.com?_dnid=84043&t=1682677168"></iframe>
              </div>
            </Col> */}

           
              
          </Row>
        </Container>
      </React.Fragment>
    </div>
  );
}
export default JobTypes;
