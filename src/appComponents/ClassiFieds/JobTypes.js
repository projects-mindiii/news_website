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
  setClassifiedFilterName,
} from "../../store/slices/ClassifiedSlice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import Loader from "../../utils/Loader/Loader";
import { CLASSIFIED_CATEGORY_TYPE, BOOK_TYPE } from "../../utils/Constants";

//-------Create a Deals Header component--------
function JobTypes() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {    classifiedFilterData,
    classifiedFilterValues,jobOfferTotalCount, jobOfferWebList, jobSeekerTotalCount, jobSeekerWebList, } =
    useSelector((state) => state.classified);
  const { userToken,isLoading } = useSelector((state) => state.user);
  const [showDefaultList, setShowDefaultList] = useState(1);
  const bookmarkLoader = useSelector((state) => state.bookMark.isLoading);
  const { bookMarkTotalCount } = useSelector((state) => state.bookMark);

  // function for classified webList
  const setClassfiedTypeValue = (value) => {
    dispatch(setClassfiedType(value));
  };
  useEffect(() => {
    setClassfiedTypeValue(CLASSIFIED_CATEGORY_TYPE.JOBOFFER);
    dispatch(setClassifiedFilterName({name:"All South Africa","refrenceType":"1","refrenceId":'all',"countryId":"0",'city':""}))
    async function getWebClassifiedLists() {
      let jobOfferQuery = "";
      if (classifiedFilterValues && classifiedFilterData.length > 0) {
        jobOfferQuery = {
          limit: 10,
          offset: 0,
          type: CLASSIFIED_CATEGORY_TYPE.JOBOFFER,
          search_by: classifiedFilterData.search_by ? classifiedFilterData.search_by : 0,
          province: classifiedFilterData.province,
          country: classifiedFilterData.country,
        };
      } else {
        jobOfferQuery = {
          limit: 10,
          offset: 0,
          type: CLASSIFIED_CATEGORY_TYPE.JOBOFFER,
          search_by:0,
        };
      }

      const jobOfferData = { userToken: userToken, whereQuery: jobOfferQuery };
      dispatch(getJobOfferListApi(jobOfferData)).then((responsejson) => {
      });

      const jobSeekerQuery = {
        limit: 10,
        offset: 0,
        type: CLASSIFIED_CATEGORY_TYPE.JOBSEEKERS,
        search_by: classifiedFilterData.search_by ? classifiedFilterData.search_by : 0,
      };
      const jobSeekerData = {
        userToken: userToken,
        whereQuery: jobSeekerQuery,
      };
      dispatch(getJobSeekerListApi(jobSeekerData)).then((responsejson) => {
      });
    }
    getWebClassifiedLists();
  }, [bookMarkTotalCount]);
  return (
    <div className="main">
      {isLoading === true || bookmarkLoader ? <Loader /> : ""}
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
                  />
                ) : (
                  <p className="nodataDisplay">
                    -- {t("NOCLASSIFIED_DISPLAY")} --{" "}
                  </p>
                )
              ) : jobSeekerWebList.length ? (
                <ClassifiedCategoryList
                  forSaleListData={jobSeekerWebList}
                  classifiedDataType={CLASSIFIED_CATEGORY_TYPE.JOBSEEKERS}
                  bookType={BOOK_TYPE.CLASSIFIED}
                />
              ) : (
                <p className="nodataDisplay">
                  -- {t("NOCLASSIFIED_DISPLAY")} --{" "}
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
