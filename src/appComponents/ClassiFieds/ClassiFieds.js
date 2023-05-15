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
import { CLASSIFIED_CATEGORY_TYPE, BOOK_TYPE } from "../../utils/Constants";
import { STATUS_CODES } from "../../utils/StatusCode";
import { Toast } from "../../utils/Toaster";
import { guestUserLogin, userLogout } from "../../store/slices/UserSlice";
import { useNavigate } from "react-router-dom";

//-------Create a Deals Header component--------
function ClassiFieds() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    forSaleTotalCount,
    forSaleWebList,
    wantedTotalCount,
    wantedWebList,
    classifiedFilterData,
    classifiedFilterValues,
  } = useSelector((state) => state.classified);
  const { userToken, isLoading } = useSelector((state) => state.user);
  const { bookMarkTotalCount } = useSelector((state) => state.bookMark);
  const [showDefaultList, setShowDefaultList] = useState(1);
  const [updateList, setUpdateList] = useState("");
  

  // function for classified webList
  const setClassfiedTypeValue = (value) => {
    dispatch(setClassfiedType(value));
  };
  // console.log("classifiedFilterData", classifiedFilterData)

  useEffect(() => {
    dispatch(setClassifiedFilterName({name:"All South Africa","refrenceType":"1","refrenceId":'all',"countryId":"0",'city':""}))

    setClassfiedTypeValue(CLASSIFIED_CATEGORY_TYPE.FORSALE);
    async function getWebClassifiedLists() {
      let forSaleQuery = "";
      if (classifiedFilterValues && classifiedFilterData.length > 0) {
        forSaleQuery = {
          limit: 10,
          offset: 0,
          type: CLASSIFIED_CATEGORY_TYPE.FORSALE,
          search_by: classifiedFilterData.search_by ? classifiedFilterData.search_by : 0,
          province: classifiedFilterData.province,
          country: classifiedFilterData.country,
        };
      } else {
        forSaleQuery = {
          limit: 10,
          offset: 0,
          type: CLASSIFIED_CATEGORY_TYPE.FORSALE,
          search_by:0,
        };
      }
      const data = { userToken: userToken, whereQuery: forSaleQuery };
      dispatch(forSaleListApi(data)).then(async (responsejson) => {
        const response = responsejson.payload;
        console.log("updateList", response)
        setUpdateList(response.data.offset)
        if (response.status_code !== STATUS_CODES.SUCCESS) {
          if (response.status === STATUS_CODES.INVALID_TOKEN) {
            Toast.fire({
              icon: "error",
              title: t("SESSION_EXPIRE"),
            });
            await dispatch(userLogout());
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
      const wantedQuery = {
        limit: 10,
        offset: 0,
        type: CLASSIFIED_CATEGORY_TYPE.WANTED,
        search_by: classifiedFilterData.search_by ? classifiedFilterData.search_by : 0,
    
      };
      const wantedData = { userToken: userToken, whereQuery: wantedQuery };
      dispatch(getWantedListApi(wantedData)).then((responsejson) => {});
    }
    getWebClassifiedLists();
  
  }, [bookMarkTotalCount]);

  return (
    <div className="main">
      <div className="classifiedData">
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
                      <Nav.Item key={1}>
                        <Nav.Link
                          onClick={() =>{
                            setClassfiedTypeValue(
                              CLASSIFIED_CATEGORY_TYPE.FORSALE
                            );
                            
                          }
                            
                          }
                          eventKey={1}
                        >
                          {t("FOR_SALE")}({forSaleTotalCount})
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
                          onClick={() =>{
                            setClassfiedTypeValue(
                              CLASSIFIED_CATEGORY_TYPE.WANTED
                            );

                          }
                           
                          }
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
                    <ClassifiedCategoryList
                      forSaleListData={forSaleWebList}
                      classifiedDataType={CLASSIFIED_CATEGORY_TYPE.FORSALE}
                      bookType={BOOK_TYPE.CLASSIFIED}
                    
                      

                    />
                  ) : (
                    <p className="nodataDisplay">
                      --{t("NOCLASSIFIED_DISPLAY")}--
                    </p>
                  )
                ) : wantedWebList.length ? (
                  <ClassifiedCategoryList
                    forSaleListData={wantedWebList}
                    classifiedDataType={CLASSIFIED_CATEGORY_TYPE.WANTED}
                    bookType={BOOK_TYPE.CLASSIFIED}
                  />
                ) : (
                  <p className="nodataDisplay">
                    --{t("NOCLASSIFIED_DISPLAY")}--
                  </p>
                )}
              </Col>
              {/* <Col xs={12} sm={12} md={12} lg={6}>
              <div className="advertisment">
              <iframe src="https://www.signafrica.com?_dnid=84043&t=1682677168"></iframe>
              </div>
            </Col> */}
            </Row>
          </Container>
        </React.Fragment>
      </div>
    </div>
  );
}
export default ClassiFieds;
