import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import NoteBoxModule from "../CommonModule/NoteBoxModule";
import { useTranslation } from "react-i18next";
import ClassifiedCategoryList from "../ClassiFieds/ClassifiedCategoryList";
import { useDispatch, useSelector } from "react-redux";
import styles from "./BookMarks.module.css";
import {
  addBookMarkApi,
  bookMarkListApi,
} from "../../store/slices/BookMarkSlice";
import { STATUS_CODES } from "../../utils/StatusCode";
import DeleteAlertBox from "../DeleteAlertBox/DeleteAlertBox";
import { Toast } from "../../utils/Toaster";
import { BOOK_ACTION_TYPE, BOOK_TYPE } from "../../utils/Constants";
import Loader from "../../utils/Loader/Loader";

function BookMarks() {
  const { t } = useTranslation();
  const { jobOfferWebList } = useSelector((state) => state.classified);
  const { bookMarkList, bookMarkTotalCount, isLoading } = useSelector(
    (state) => state.bookMark
  );
  const { userToken } = useSelector((state) => state.user);
  const [offset, setOffset] = useState(0)
  const dispatch = useDispatch();
  //----- state for manage show/hide modal-----
  const [showPopup, setShowPopup] = useState(false);

  //----- for close modal-----
  const handleClose = () => setShowPopup(false);
  //----- for show modal-----
  const handleShow = () => setShowPopup(true);

  useEffect(() => {
    async function getBookMark() {
      const bookMarkRequired = { limit: 10, offset: offset };
      const BookMarkData = {
        userToken: userToken,
        requiredValue: bookMarkRequired,
      };
      dispatch(bookMarkListApi(BookMarkData)).then((responsejson) => {
        if (responsejson.payload.status_code == STATUS_CODES.SUCCESS) {
        }
      });
    }
    getBookMark();
  }, [offset, bookMarkTotalCount]);

  async function removeAllBookmark() {
    const requestData = new FormData();
    requestData.append("id", 0);
    requestData.append("status", BOOK_ACTION_TYPE.REMOVE_ALL);
    requestData.append("type", 0);
    dispatch(
      addBookMarkApi({ userToken: userToken, requestData: requestData })
    ).then((response) => {
      if (response.payload.status_code == STATUS_CODES.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: response.payload.message,
        });
        const requiredValue = { limit: 10, offset: 0 };
        dispatch(bookMarkListApi({ userToken: userToken, requiredValue }));
        handleClose();
      } else if (response.payload.status == STATUS_CODES.BAD_REQUEST) {
        Toast.fire({
          icon: "error",
          title: response.payload.data.message,
        });
      }
    });
  }

  return (
    <>
      {isLoading ? <Loader /> : ""}
      <section className="main">
        <Container>
          <div>
            <Row>
              <Col xs={12} sm={12} md={12} lg={6}>
                <NoteBoxModule
                  headText={t("BOOK_MARK_HEADING")}
                  headSubText={t("BOOK_MARK_SUBHEAD")}
                  detailText={t("BOOK_MARK_DETAILTEXT")}
                />
              </Col>
              <Col xs={12} sm={12} md={12} lg={6}>
                {bookMarkList && bookMarkList.length > 0 ? (
                  <>
                    <div className={styles.bookmarkHeading}>
                      <h3>{t("YOURS_BOOK_MARKS")}</h3>
                    </div>
                    <p className={styles.clearAll}>
                      <span onClick={() => handleShow()}>{t("CLEAR_ALL")}</span>
                    </p>
                    <ClassifiedCategoryList
                      displayRoute="bookmark"
                      forSaleListData={bookMarkList}
                      bookType={BOOK_TYPE.CLASSIFIED}
                    />
                    <Button type="button" onClick={()=>setOffset(10)}>Load More</Button>
                  </>
                ) : (
                  <h4 className="youAdd_NotShow">{t("NO_BOOK_MARKS")}</h4>
                )}
              </Col>
            </Row>
          </div>
        </Container>
        <Del