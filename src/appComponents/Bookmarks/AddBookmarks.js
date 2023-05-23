import React, { useState } from "react";
import { Icon } from "@iconify/react";
import SublyApi from "../../helpers/Api";
import { useSelector, useDispatch } from "react-redux";
import { STATUS_CODES } from "../../utils/StatusCode";
import { BOOK_ACTION_TYPE, PAGINATION_VALUE } from "../../utils/Constants";
import { Toast } from "../../utils/Toaster";
import {
  addBookmarkApi,
  bookmarkListApi,
} from "../../store/slices/BookmarkSlice";
import { guestUserLogin, userLogout } from "../../store/slices/UserSlice";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import LoginAlertModel from "../../authComponents/LoginAlertModel/LoginAlertModel";

function AddBookmarks(props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userToken, currentUser } = useSelector((state) => state.user);
  const [shwoAlertPopup, setShowAlertPopup] = useState(false);

  // =====Here managing add and remove bookmark and calling api=====
  async function handleAddBookmark(id, action) {
    const requestData = new FormData();
    requestData.append("id", id);
    requestData.append("status", action);
    requestData.append("type", props.bookType);
    dispatch(
      addBookmarkApi({ userToken: userToken, requestData: requestData })
    ).then((response) => {
      if (response.payload.status_code == STATUS_CODES.SUCCESS) {
        if (action == BOOK_ACTION_TYPE.ADD) {
          Toast.fire({
            icon: "success",
            title: response.payload.message,
          });
          const requiredValue = {
            limit: PAGINATION_VALUE.DEFAULT_LIMIT,
            offset: PAGINATION_VALUE.DEFAULT_OFFSET,
          };
          dispatch(bookmarkListApi({ userToken: userToken, requiredValue }));
        } else {
          Toast.fire({
            icon: "success",
            title: response.payload.message,
          });
          const requiredValue = {
            limit: PAGINATION_VALUE.DEFAULT_LIMIT,
            offset: PAGINATION_VALUE.DEFAULT_OFFSET,
          };
          dispatch(bookmarkListApi({ userToken: userToken, requiredValue }));
        }
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
        dispatch(userLogout());
        dispatch(guestUserLogin());
        navigate("/login");
      }
    });
  }
  return (
    <>
      {" "}
      <section>
        {props.isBookmark == 0 ? (
          <Icon
            icon="ic:baseline-bookmark-border"
            color="black"
            width="28"
            height="28"
            cursor={"pointer"}
            onClick={() => {
              if (
                props.isApproved == 1 &&
                Object.keys(currentUser).length !== 0
              ) {
                handleAddBookmark(props.id, BOOK_ACTION_TYPE.ADD);
              } else if (!Object.keys(currentUser).length) {
                setShowAlertPopup(true);
              }
            }}
          />
        ) : (
          <Icon
            icon="ic:baseline-bookmark"
            color="black"
            width="28"
            height="28"
            cursor={"pointer"}
            onClick={() => {
              handleAddBookmark(props.id, BOOK_ACTION_TYPE.REMOVE);
            }}
          />
        )}
      </section>
      {shwoAlertPopup && <LoginAlertModel modalValue={true} bookmark={true} />}
    </>
  );
}

export default AddBookmarks;
