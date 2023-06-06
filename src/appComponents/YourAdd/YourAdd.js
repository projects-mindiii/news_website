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
import Loader from "../../utils/Loader/Loader";
import NoteBoxModule from "../CommonModule/NoteBoxModule";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { guestUserLogin, userLogout } from "../../store/slices/UserSlice";
import { Toast } from "../../utils/Toaster";

// -----function for your advert module----------
function YourAdd() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { t } = useTranslation();
  const { userToken } = useSelector((state) => state.user);
  const { yourAdvertWebList, yourAdvertTotalCount, isLoading } = useSelector(
    (state) => state.classified
  );
  const bookmarkLoader = useSelector((state) => state.bookmark.isLoading);
  const { bookmarkTotalCount } = useSelector(
    (state) => state.bookmark
  );

  useEffect(() => {
    async function getWebClassifiedLists() {
      const yourAdvertQuery = { limit: 10, offset: 0, type: 1 };
      const data = { userToken: userToken, whereQuery: yourAdvertQuery };
      dispatch(yourAdvertListApi(data)).then(async (responsejson) => {
        const response = responsejson.payload;
        if (response.status) {
          if (response.status === STATUS_CODES.INVALID_TOKEN) {
            Toast.fire({
              icon: "error",
              title: t("SESSION_EXPIRE"),
            });
            await dispatch(userLogout(userToken)).then(() => {
              dispatch(guestUserLogin());
              navigate("/login");
            })
          }
        }
      });
    }
    getWebClassifiedLists();
  }, [bookmarkTotalCount]);

  return (
    <div className="main">
      {isLoading === true || bookmarkLoader ? <Loader /> : ""}
      <React.Fragment>
        <Container className="screenOverride">
          <Row>
            <Col xs={12} sm={12} md={12} lg={6}>
              <NoteBoxModule
                headText={t("YOUR_ADVERTS")}
                headSubText={t("NOTE")}
                detailText={t("ADVERT_NOTE")}
              />
            </Col>
            <Col xs={12} sm={12} md={12} lg={6}>
              <div className="postAdvertBox">
                {yourAdvertWebList && yourAdvertWebList.length < 1 && (
                  <h5 className="youAdd_NotShow">
                    {t("NO_ADVERT")}
                  </h5>
                )}
                <ClassifiedCategoryList
                  displayRoute="your_advert"
                  forSaleListData={yourAdvertWebList}
                  classifiedDataType={4}
                  bookType={BOOK_TYPE.CLASSIFIED}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    </div>
  );
}
export default YourAdd;
