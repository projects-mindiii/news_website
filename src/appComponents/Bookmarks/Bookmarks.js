import React, { useEffect, useState } from "react";
import {Col, Container, Row } from "react-bootstrap";
import NoteBoxModule from "../CommonModule/NoteBoxModule";
import { useTranslation } from "react-i18next";
import ClassifiedCategoryList from "../ClassiFieds/ClassifiedCategoryList";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Bookmarks.module.css";
import {
  addBookmarkApi,
  bookmarkListApi,
} from "../../store/slices/BookmarkSlice";
import { STATUS_CODES } from "../../utils/StatusCode";
import DeleteAlertBox from "../DeleteAlertBox/DeleteAlertBox";
import { Toast } from "../../utils/Toaster";
import {
  BOOK_ACTION_TYPE,
  BOOK_TYPE,
  PAGINATION_VALUE,
} from "../../utils/Constants";
import Loader from "../../utils/Loader/Loader";
import CustomBtn from "../../formComponent/Button/Button";
import { guestUserLogin, userLogout } from "../../store/slices/UserSlice";
import { useNavigate } from "react-router-dom";

function Bookmarks() {
  const { t } = useTranslation();
  const { bookmarkList, bookmarkTotalCount, isLoading } = useSelector(
    (state) => state.bookmark
  );
  const { userToken } = useSelector((state) => state.user);
  const [offset, setOffset] = useState(PAGINATION_VALUE.DEFAULT_OFFSET);
  const dispatch = useDispatch();
  //----- state for manage show/hide modal-----
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  //----- for close modal-----
  const handleClose = () => setShowPopup(false);
  //----- for show modal-----
  const handleShow = () => setShowPopup(true);

  async function getBookmark(loadMore, offsetValue) {
    const bookmarkRequired = {
      limit: PAGINATION_VALUE.DEFAULT_LIMIT,
      offset: offsetValue,
    };
    const BookmarkData = {
      userToken: userToken,
      requiredValue: bookmarkRequired,
      loadMore: loadMore,
    };
    dispatch(bookmarkListApi(BookmarkData)).then((responsejson) => {
      if (responsejson.payload.response.status === STATUS_CODES.INVALID_TOKEN) {
        Toast.fire({
          icon: "error",
          title: t("SESSION_EXPIRE"),
        });
        dispatch(userLogout(userToken)).then(() => {
          dispatch(guestUserLogin());
          navigate("/login");
        });
      }
    });
  }
  useEffect(() => {
    getBookmark(false, offset);
    setOffset(PAGINATION_VALUE.DEFAULT_OFFSET);
  }, []);

  function loadmore() {
    setOffset(offset + PAGINATION_VALUE.DEFAULT_LIMIT);
    getBookmark(true, offset + PAGINATION_VALUE.DEFAULT_LIMIT);
  }

  // =====Here Calling API for remove all bookmark=====
  async function removeAllBookmark() {
    const requestData = new FormData();
    requestData.append("id", 0);
    requestData.append("status", BOOK_ACTION_TYPE.REMOVE_ALL);
    requestData.append("type", 0);
    dispatch(
      addBookmarkApi({ userToken: userToken, requestData: requestData })
    ).then((response) => {
      if (response.payload.status_code == STATUS_CODES.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: response.payload.message,
        });
        const requiredValue = {
          limit: PAGINATION_VALUE.DEFAULT_LIMIT,
          offset: offset,
        };
        dispatch(bookmarkListApi({ userToken: userToken, requiredValue }));
        handleClose();
      } else if (response.payload.status == STATUS_CODES.BAD_REQUEST) {
        Toast.fire({
          icon: "error",
          title: response.payload.data.message,
        });
      } else if (response.payload.status === STATUS_CODES.INVALID_TOKEN) {
        Toast.fire({
          icon: "error",
          title: t("SESSION_EXPIRE"),
        });
        dispatch(userLogout(userToken)).then(() => {
          dispatch(guestUserLogin());
          navigate("/login");
        })
      }
    });
  }

  return (
    <>
      {isLoading ? <Loader /> : ""}
      <section className="main">
        <Container className="screenOverride">
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
                {bookmarkList && bookmarkList.length > 0 ? (
                  <>
                    <div className={styles.bookmarkHeading}>
                      <h3>{t("YOURS_BOOK_MARKS")}</h3>
                    </div>
                    <p className={styles.clearAll}>
                      <span onClick={() => handleShow()}>{t("CLEAR_ALL")}</span>
                    </p>
                    <ClassifiedCategoryList
                      displayRoute="bookmark"
                      forSaleListData={bookmarkList}
                      bookType={BOOK_TYPE.CLASSIFIED}
                    />
                    {bookmarkList.length >= bookmarkTotalCount ? (
                      ""
                    ) : (
                      <div className="loadmoreBtn">
                        <CustomBtn
                          children={t("LOAD_MORE")}
                          type={"button"}
                          onClick={() => loadmore()}
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <h5 className="youAdd_NotShow">{t("NO_BOOK_MARKS")}</h5>
                )}
              </Col>
            </Row>
          </div>
        </Container>
        <DeleteAlertBox
          handleClose={handleClose}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
          deleteHandle={removeAllBookmark}
          alertText={t("REMOVE_ALL_BOOKMARK")}
        />
      </section>
    </>
  );
}

export default Bookmarks;
