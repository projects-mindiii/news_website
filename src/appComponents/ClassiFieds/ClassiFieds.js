import "./ClassiFieds.css";
import { Row, Nav, Container, Col, Tab } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { useSelector } from "react-redux";
import ClassifiedCategoryList from "./ClassifiedCategoryList";
import {
  setClassfiedType,
  getWantedListApi,
  forSaleListApi,
  setClassifiedFilterName,
} from "../../store/slices/ClassifiedSlice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import Loader from "../../utils/Loader/Loader";
import {CLASSIFIED_REFRENCE_TYPE, CLASSIFIED_CATEGORY_TYPE, BOOK_TYPE,PAGINATION_VALUE, SEARCH_TYPE } from "../../utils/Constants";
import { STATUS_CODES } from "../../utils/StatusCode";
import { Toast } from "../../utils/Toaster";
import { guestUserLogin, userLogout } from "../../store/slices/UserSlice";
import { useNavigate } from "react-router-dom";
import CustomBtn from "../../formComponent/Button/Button";


function ClassiFieds() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    forSaleTotalCount,
    forSaleWebList,
    wantedTotalCount,
    wantedWebList,
    classifiedFilterValues,
    isLoading
  } = useSelector((state) => state.classified);
  const { userToken } = useSelector((state) => state.user);
  const bookmarkLoader = useSelector((state) => state.bookmark.isLoading);
  const { bookmarkTotalCount } = useSelector((state) => state.bookmark);
  const [showDefaultList, setShowDefaultList] = useState(1);
  const [offsetForSale, setOffsetForSale] = useState(0);
  const [offsetWanted, setOffsetWanted] = useState(0);

  //function for loadmore forsale
  const loadmoreForsale = () => {
    setOffsetForSale(offsetForSale + PAGINATION_VALUE.DEFAULT_LIMIT);
    getForSaleList(true, offsetForSale + PAGINATION_VALUE.DEFAULT_LIMIT);
  };

 //function for loadmore for wanted
  const loadmoreWanted = () => {
    setOffsetWanted(offsetWanted + PAGINATION_VALUE.DEFAULT_LIMIT);
    getWantedList(true, offsetWanted + PAGINATION_VALUE.DEFAULT_LIMIT);
  };

  // function for classified webList
  const setClassfiedTypeValue = (value) => {
    dispatch(setClassfiedType(value));
  };

  // function for forSaleList Api
  function getForSaleList(loadmore, offsetValue){
    let forSaleQuery = "";
    if (
      classifiedFilterValues && classifiedFilterValues.length > 0
    ) {
      forSaleQuery = {
        limit: PAGINATION_VALUE.DEFAULT_LIMIT,
        offset: offsetValue ? offsetValue : offsetForSale,
        type: CLASSIFIED_CATEGORY_TYPE.FORSALE,
        search_by: classifiedFilterValues.search_by
          ? classifiedFilterValues.search_by
          : SEARCH_TYPE.ALL_SOUTH_AFRICA,
        province: classifiedFilterValues.province,
        country: classifiedFilterValues.country,
      };
    } else {
      forSaleQuery = {
        limit: PAGINATION_VALUE.DEFAULT_LIMIT,
        offset: offsetValue ? offsetValue : offsetForSale,
        type: CLASSIFIED_CATEGORY_TYPE.FORSALE,
        search_by: SEARCH_TYPE.ALL_SOUTH_AFRICA,
      };
    }

    const data = {
      userToken: userToken,
      whereQuery: forSaleQuery,
      loadmore: loadmore,
    };
    dispatch(forSaleListApi(data)).then(async (responsejson) => {
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

   // function for wantedlist Api
  function getWantedList(loadmore, offsetValue){
    const wantedQuery = {
      limit: PAGINATION_VALUE.DEFAULT_LIMIT,
      offset: offsetValue ? offsetValue : offsetWanted,
      type: CLASSIFIED_CATEGORY_TYPE.WANTED,
      search_by: classifiedFilterValues.search_by
        ? classifiedFilterValues.search_by
        : SEARCH_TYPE.ALL_SOUTH_AFRICA,
    };
    const wantedData = {
      userToken: userToken,
      whereQuery: wantedQuery,
      loadmore: loadmore,
    };
    dispatch(getWantedListApi(wantedData)).then(async(responsejson) => {
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

  //function for loadmore
  async function getWebClassifiedLists(loadmore, offsetValue) {
    getForSaleList(loadmore, offsetValue);
    getWantedList(loadmore, offsetValue);
  }

  useEffect(() => {
    dispatch(
      setClassifiedFilterName({
        name:`${t("COUNTRY_NAME")}`,
        refrenceType: CLASSIFIED_REFRENCE_TYPE.ALL_SOUTH_AFRICA,
        refrenceId: `${t("REFRENCE_ID")}`,
        countryId: "0",
        city: "",
      })
    );

    setClassfiedTypeValue(CLASSIFIED_CATEGORY_TYPE.FORSALE);
    getWebClassifiedLists(false, PAGINATION_VALUE.DEFAULT_OFFSET);
  }, [bookmarkTotalCount]);

  return (
    <div className="main">
      <div className="classifiedData">
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
                      <Nav.Item key={1}>
                        <Nav.Link
                          onClick={() => {
                            setClassfiedTypeValue(
                              CLASSIFIED_CATEGORY_TYPE.FORSALE
                            );
                          }}
                          eventKey={1}
                        >
                          {t("FOR_SALE")} ({forSaleTotalCount})
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
                      <Nav.Item key={2}>
                        <Nav.Link
                          onClick={() => {
                            setClassfiedTypeValue(
                              CLASSIFIED_CATEGORY_TYPE.WANTED
                            );
                          }}
                          eventKey={2}
                        >
                          {t("WANTED")} ({wantedTotalCount})
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
                  forSaleWebList.length > 0 ? (
                    <>
                      <ClassifiedCategoryList
                        key={0}
                        forSaleListData={forSaleWebList}
                        classifiedDataType={CLASSIFIED_CATEGORY_TYPE.FORSALE}
                        bookType={BOOK_TYPE.CLASSIFIED}
                      />
                      {forSaleWebList.length >= forSaleTotalCount ? (
                        ""
                      ) : (
                        <div className="loadmoreBtn">
                        <CustomBtn type="button" onClick={() => loadmoreForsale()}>
                         {t("LOADMORE_BUTTON")}
                        </CustomBtn></div>
                      )}
                    </>
                  ) : (
                    <p className="nodataDisplay">
                      --{t("NOCLASSIFIED_DISPLAY")}--
                    </p>
                  )
                ) : wantedWebList.length ? (
                  <>
                    <ClassifiedCategoryList
                      key={1}
                      forSaleListData={wantedWebList}
                      classifiedDataType={CLASSIFIED_CATEGORY_TYPE.WANTED}
                      bookType={BOOK_TYPE.CLASSIFIED}
                    />
                    {wantedWebList.length >= wantedTotalCount ? (
                      ""
                    ) : (
                      <div className="loadmoreBtn">
                      <CustomBtn type="button" onClick={() => loadmoreWanted()}>
                      {t("LOADMORE_BUTTON")}
                      </CustomBtn></div>
                    )}
                  </>
                ) : (
                  <p className="nodataDisplay">
                    --{t("NOCLASSIFIED_DISPLAY")}--
                  </p>
                )}
              </Col>
               <Col xs={12} sm={12} md={12} lg={6}>
              <div className="advertisment">
              <iframe src="https://www.signafrica.com?_dnid=84043&t=1682677168" height="930" scrolling="no"></iframe>
              </div>
            </Col> 
            </Row>
          </Container>
        </React.Fragment>
      </div>
    </div>
  );
}
export default ClassiFieds;
