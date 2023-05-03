import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import NoteBoxModule from "../CommonModule/NoteBoxModule";
import { useTranslation } from "react-i18next";
import ClassifiedCategoryList from "../ClassiFieds/ClassifiedCategoryList";
import { useSelector } from "react-redux";
import styles from "./BookMarks.module.css";

function BookMarks() {
  const { t } = useTranslation();
  const { jobOfferWebList } = useSelector((state) => state.classified);

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
              <div className={styles.bookmarkHeading}>
                <h3>{t("YOURS_BOOK_MARKS")}</h3>
              </div>
              <ClassifiedCategoryList
                forSaleListData={jobOfferWebList}
                classifiedDataType={6}
              />
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
}

export default BookMarks;
