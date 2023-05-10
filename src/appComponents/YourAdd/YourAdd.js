import "./YourAdd.css";
import { Row, Nav, Container, Col, Tab } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import CommonDataShow from "../../CommonComponent/CommonDataShow";
import WhatsappshareContact from "../../CommonComponent/WhatsappshareContact";
import { useSelector } from "react-redux";
import SublyApi from "../../helpers/Api";
import { STATUS_CODES } from "../../utils/StatusCode";
import ClassifiedCategoryList from "../ClassiFieds/ClassifiedCategoryList";
import { yourAdvertListApi } from "../../store/slices/ClassifiedSlice";
import { useDispatch } from "react-redux";
import { BOOK_TYPE } from "../../utils/Constants";

//-------Create a Deals Header component--------
function YourAdd() {
  const dispatch = useDispatch();

  const { userToken, currentUser, isLoading } = useSelector(
    (state) => state.user
  );
  const { yourAdvertWebList, yourAdvertTotalCount } = useSelector(
    (state) => state.classified
  );
  const { bookMarkTotalCount } = useSelector((state) => state.bookMark);

  useEffect(() => {
    async function getWebClassifiedLists() {
      const yourAdvertQuery = { limit: 10, offset: 0, type: 1 };
      const data = { userToken: userToken, whereQuery: yourAdvertQuery };
      dispatch(yourAdvertListApi(data)).then((responsejson) => {
        console.log("responsejsonresponsejson", responsejson);
      });
    }
    getWebClassifiedLists();
  }, [bookMarkTotalCount]);

  return (
    <div className="main">
      <React.Fragment>
        <Container>
          <Row>
            <Col xs={12} sm={12} md={12} lg={6}>
              <div className="yourAdd">
                <p>YOUR ADVERTS</p>
                <div className="yourAdd_Note">
                  <p>
                    PLEASE NOTE -
                    <small>
                      All adverts are subject to approval. Adverts will be
                      removed after 60 days. Delete or Edit your advert anytime
                    </small>
                  </p>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={12} md={12} lg={6}>
              <div className="postAdvertBox">
                {yourAdvertWebList && yourAdvertWebList.length < 1 && (
                  <h5 className="youAdd_NotShow">
                    --- NO ADVERTS TO DISPLAY ---{" "}
                  </h5>
                )}
                <ClassifiedCategoryList
                  displayRoute="your_advert"
                  forSaleListData={yourAdvertWebList}
                  classifiedDataType={4}
                  bookType={BOOK_TYPE.CLASSIFIED}
                />
              </div>

              {/* {yourAdvertWebList && yourAdvertWebList.map((item, index) => (
                                item.approval_status == 1 &&
                                <div className="yourAdd_DataShow">
                                    <CommonDataShow yourdata={item} />
                                    <WhatsappshareContact yourdata={item} />
                                    <button className="edit_DeleteButton">EDIT / DELETE ADVERT</button>
                                </div>
                            ))}
                            {yourAdvertWebList && yourAdvertWebList.some(item => item.approval_status == 0) == true && <h5 className="youAdd_PendingApproval">---- PENDING APPROVAL ----</h5>}
                            {yourAdvertWebList && yourAdvertWebList.map((item, index) => (
                                item.approval_status == 0 &&
                                <div className="yourAdd_DataShow">
                                    <CommonDataShow yourdata={item} />
                                    <WhatsappshareContact yourdata={item} />
                                    <button className="edit_DeleteButton">EDIT / DELETE ADVERT</button>
                                    <button className="not_live">NOT LIVE - Pending Approvals</button>
                                </div>
                            ))} */}
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    </div>
  );
}
export default YourAdd;
