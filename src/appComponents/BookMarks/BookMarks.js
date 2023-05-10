import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import NoteBoxModule from "../CommonModule/NoteBoxModule";
import { useTranslation } from "react-i18next";
import ClassifiedCategoryList from "../ClassiFieds/ClassifiedCategoryList";
import { useDispatch, useSelector } from "react-redux";
import styles from "./BookMarks.module.css";
import { bookMarkListApi } from "../../store/slices/BookMarkSlice";
import { STATUS_CODES } from "../../utils/StatusCode";

function BookMarks() {
  const { t } = useTranslation();
  const { jobOfferWebList } = useSelector((state) => state.classified);
  const { bookMarkList } = useSelector((state) => state.bookMark);
  const { userToken, isLoading } = useSelector((state) => state.user);
  const { bookMarkTotalCount } = useSelector((state) => state.bookMark);


  const dispatch = useDispatch();

  useEffect(() => {
    async function getBookMark() {
      const bookMarkRequired = { limit: 10, offset: 0 };
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
  }, [bookMarkTotalCount]);

  return (
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
              {bookMarkList.list && bookMarkList.list.length>0 ? <>
                <div className={styles.bookmarkHeading}>
                  <h3>{t("YOURS_BOOK_MARKS")}</h3>
                </div>
                <ClassifiedCategoryList
                  forSaleListData={jobOfferWebList}
                />
              </> : <h4 className="youAdd_NotShow">{t("NO_BOOK_MARKS")}</h4> }
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
}

export default BookMarks;
