import "./ClassiFieds.css";
import { Button, Row, Nav, Container, Col, Tab } from "react-bootstrap";
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
import {
  CLASSIFIED_REFRENCE_TYPE,
  CLASSIFIED_CATEGORY_TYPE,
  BOOK_TYPE,
  PAGINATION_VALUE,
  SEARCH_TYPE,
} from "../../utils/Constants";
import { STATUS_CODES } from "../../utils/StatusCode";
import { Toast } from "../../utils/Toaster";
import { useNavigate } from "react-router-dom";
import { guestUserLogin, userLogout } from "../../store/slices/UserSlice";

//-------Create a Deals Header component--------
function JobTypes() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    classifiedFilterValues,
    jobOfferTotalCount,
    jobOfferWebList,
    jobSeekerTotalCount,
    jobSeekerWebList,
    isLoading
  } = useSelector((state) => state.classified);
  const { userToken } = useSelector((state) => state.user);
  const [showDefaultList, setShowDefaultList] = useState(1);
  const bookmarkLoader = useSelector((state) => state.bookmark.isLoading);
  const { bookmarkTotalCount } = useSelector((state) => state.bookmark);
  const [offsetJobOffer, setOffsetJobOffer] = useState(0);
  const [offsetJobSeeker, setOffsetJobSeeker] = useState(0);

  // function for handle loadmore for jobOffer
  const loadmoreJobOffer = () => {
    setOffsetJobOffer(offsetJobOffer + PAGINATION_VALUE.DEFAULT_LIMIT);
    getJobOfferList(true, offsetJobOffer + PAGINATION_VALUE.DEFAULT_LIMIT);
  };

  // function for handle loadmore for jobSeeker
  const loadmoreJobSeeker = () => {
    setOffsetJobSeeker(offsetJobSeeker + PAGINATION_VALUE.DEFAULT_LIMIT);
    getJobSeekerList(true, offsetJobSeeker + PAGINATION_VALUE.DEFAULT_LIMIT);
  };

  // function for classified webList
  const setClassfiedTypeValue = (value) => {
    dispatch(setClassfiedType(value));
  };

  // function for jobOfferList Api
  function getJobOfferList(loadmore, offsetValue) {
    let jobOfferQuery = "";
    if (classifiedFilterValues && classifiedFilterValues.length > 0) {
      jobOfferQuery = {
        limit: PAGINATION_VALUE.DEFAULT_LIMIT,
        offset: offsetValue ? offsetValue : offsetJobOffer,
        type: CLASSIFIED_CATEGORY_TYPE.JOBOFFER,
        search_by: classifiedFilterValues.search_by
          ? classifiedFilterValues.search_by
          : SEARCH_TYPE.ALL_SOUTH_AFRICA,
        province: classifiedFilterValues.province,
        country: classifiedFilterValues.country,
      };
    } else {
      jobOfferQuery = {
        limit: PAGINATION_VALUE.DEFAULT_LIMIT,
        offset: offsetValue ? offsetValue : offsetJobOffer,
        type: CLASSIFIED_CATEGORY_TYPE.JOBOFFER,
        search_by: SEARCH_TYPE.ALL_SOUTH_AFRICA,
      };
    }

    const jobOfferData = {
      userToken: userToken,
      whereQuery: jobOfferQuery,
      loadmore: loadmore,
    };
    dispatch(getJobOfferListApi(jobOfferData)).then(async (responsejson) => {
      const response = responsejson.payload.response;
      if (response.status_code !== STATUS_CODES.SUCCESS) {
        if (response.status === STATUS_CODES.INVALID_TOKEN) {
          Toast.fire({
            icon: "error",
            title: t("SESSION_EXPIRE"),
          });
          await dispatch(userLogout(userToken));
          await dispatch(guestUserLogin());
          navigate("/login");
        } else {
          Toast.fire({
            icon: "error",
            title: response.data.message,
          });
        }
      }
    });
  }

  // function for jobSeekerList Api
  function getJobSeekerList(loadmore, offsetValue) {
    const jobSeekerQuery = {
      limit: PAGINATION_VALUE.DEFAULT_LIMIT,
      offset: offsetValue ? offsetValue : offsetJobSeeker,
      type: CLASSIFIED_CATEGORY_TYPE.JOBSEEKERS,
      search_by: classifiedFilterValues.search_by
        ? classifiedFilterValues.search_by
        : SEARCH_TYPE.ALL_SOUTH_AFRICA,
    };
    const jobSeekerData = {
      userToken: userToken,
      whereQuery: jobSeekerQuery,
      loadmore: loadmore,
    };
    dispatch(getJobSeekerListApi(jobSeekerData)).then(async (responsejson) => {
      const response = responsejson.payload.response;
      if (response.status_code !== STATUS_CODES.SUCCESS) {
        if (response.status === STATUS_CODES.INVALID_TOKEN) {
          Toast.fire({
            icon: "error",
            title: t("SESSION_EXPIRE"),
          });
          await dispatch(userLogout(userToken));
          await dispatch(guestUserLogin());
          navigate("/login");
        } else {
          Toast.fire({
            icon: "error",
            title: response.data.message,
          });
        }
      }
    });
  }

  // function for loadmoreList
  async function getWebClassifiedLists(loadmore, offsetValue) {
    getJobOfferList(loadmore, offsetValue);
    getJobSeekerList(loadmore, offsetValue);
  }

  // function for show default all south africa list api
  useEffect(() => {
    dispatch(
      setClassifiedFilterName({
        name: `${t("COUNTRY_NAME")}`,
        refrenceType: CLASSIFIED_REFRENCE_TYPE.ALL_SOUTH_AFRICA,
        refrenceId: `${t("REFRENCE_ID")}`,
        countryId: "0",
        city: "",
      })
    );
    setClassfiedTypeValue(CLASSIFIED_CATEGORY_TYPE.JOBOFFER);

    getWebClassifiedLists(false, PAGINATION_VALUE.DEFAULT_OFFSET);
  }, [bookmarkTotalCount]);
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
                        <MdKeyboardArrowUp
                          icon="ic:baseline-keyboard-arrow-down"
                          width="24"
                          height="24"
                          color="white"
                        />
                      ) : (
                        <MdKeyboardArrowDown
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
                        <MdKeyboardArrowUp
                          icon="ic:baseline-keyboard-arrow-down"
                          width="24"
                          height="24"
                          color="white"
                        />
                      ) : (
                        <MdKeyboardArrowDown
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
                  <>
                    <ClassifiedCategoryList
                      key={0}
                      forSaleListData={jobOfferWebList}
                      classifiedDataType={CLASSIFIED_CATEGORY_TYPE.JOBOFFER}
                      bookType={BOOK_TYPE.CLASSIFIED}
                    />
                    {jobOfferWebList.length >= jobOfferTotalCount ? (
                      ""
                    ) : (
                      <div className="loadmoreBtn">
                        <Button
                          type="button"
                          onClick={() => loadmoreJobOffer()}
                        >
                          {t("LOADMORE_BUTTON")}
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="nodataDisplay">
                    -- {t("NOCLASSIFIED_DISPLAY")} --{" "}
                  </p>
                )
              ) : jobSeekerWebList.length ? (
                <>
                  <ClassifiedCategoryList
                    key={1}
                    forSaleListData={jobSeekerWebList}
                    classifiedDataType={CLASSIFIED_CATEGORY_TYPE.JOBSEEKERS}
                    bookType={BOOK_TYPE.CLASSIFIED}
                  />
                  {jobSeekerWebList.length >= jobSeekerTotalCount ? (
                    ""
                  ) : (
                    <div className="loadmoreBtn">
                      <Button type="button" onClick={() => loadmoreJobSeeker()}>
                        {t("LOADMORE_BUTTON")}
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <p className="nodataDisplay">
                  -- {t("NOCLASSIFIED_DISPLAY")} --{" "}
                </p>
              )}
            </Col>
            <Col xs={12} sm={12} md={12} lg={5}>
              <div className="advertisment">
                <iframe src="https://www.signafrica.com?_dnid=84043&t=1682677168" height="930" scrolling="no"></iframe>
              </div>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    </div>
  );
}
export default JobTypes;
