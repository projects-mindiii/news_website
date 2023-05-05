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
} from "../../store/slices/ClassifiedSlice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import Loader from "../../utils/Loader/Loader";
import { CLASSIFIED_CATEGORY_TYPE } from "../../utils/Constants";

//-------Create a Deals Header component--------
function ClassiFieds() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const {
    forSaleTotalCount,
    forSaleWebList,
    wantedTotalCount,
    wantedWebList,
  } = useSelector((state) => state.classified);
  const { userToken, isLoading } = useSelector((state) => state.user);
  const [showDefaultList, setShowDefaultList] = useState(1);

  
  // function for classified webList
  const setClassfiedTypeValue = (value) => {
    dispatch(setClassfiedType(value));
  };
  useEffect(() => {
    setClassfiedTypeValue(
      CLASSIFIED_CATEGORY_TYPE.FORSALE
    )
    async function getWebClassifiedLists() {
      const forSaleQuery = {
        limit: 10,
        offset: 0,
        type: CLASSIFIED_CATEGORY_TYPE.FORSALE,
      };
      const data = { userToken: userToken, whereQuery: forSaleQuery };
      dispatch(forSaleListApi(data)).then((responsejson) => {});

      const wantedQuery = {
        limit: 10,
        offset: 0,
        type: CLASSIFIED_CATEGORY_TYPE.WANTED,
      };
      const wantedData = { userToken: userToken, whereQuery: wantedQuery };
      dispatch(getWantedListApi(wantedData)).then((responsejson) => {});
    }
    getWebClassifiedLists();
  }, []);
  
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
                          onClick={() =>
                            setClassfiedTypeValue(
                              CLASSIFIED_CATEGORY_TYPE.FORSALE
                            )
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
                          onClick={() =>
                            setClassfiedTypeValue(
                              CLASSIFIED_CATEGORY_TYPE.WANTED
                            )
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
                    />
                  ) : (
                    <p className="nodataDisplay">
                      --{t("N0CLASSIFIED_DISPLAY")}--
                    </p>
                  )
                ) : wantedWebList.length ? (
                  <ClassifiedCategoryList
                    forSaleListData={wantedWebList}
                    classifiedDataType={CLASSIFIED_CATEGORY_TYPE.WANTED}
                  />
                ) : (
                  <p className="nodataDisplay">
                    --{t("N0CLASSIFIED_DISPLAY")}--
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
