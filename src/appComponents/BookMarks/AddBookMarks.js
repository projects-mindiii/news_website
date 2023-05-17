import React, { useState } from "react";
import { Icon } from "@iconify/react";
import SublyApi from "../../helpers/Api";
import { useSelector, useDispatch } from "react-redux";
import { STATUS_CODES } from "../../utils/StatusCode";
import { BOOK_ACTION_TYPE, PAGINATION_VALUE } from "../../utils/Constants";
import { Toast } from "../../utils/Toaster";
import {
  addBookMarkApi,
  bookMarkListApi,
} from "../../store/slices/BookMarkSlice";
import { guestUserLogin, userLogout } from "../../store/slices/UserSlice";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function AddBookMarks(props) {
  const { t } = useTranslation(); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userToken, currentUser } = useSelector((state) => state.user);

  async function handleAddBookMark(id, action) {
    const requestData = new FormData();
    requestData.append("id", id);
    requestData.append("status", action);
    requestData.append("type", props.bookType);
    dispatch(
      addBookMarkApi({ userToken: userToken, requestData: requestData })
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
          dispatch(bookMarkListApi({ userToken: userToken, requiredValue }));
        } else {
          Toast.fire({
            icon: "success",
            title: response.payload.message,
          });
          const requiredValue = {
            limit: PAGINATION_VALUE.DEFAULT_LIMIT,
            offset: PAGINATION_VALUE.DEFAULT_OFFSET,
          };
          dispatch(bookMarkListApi({ userToken: userToken, requiredValue }));
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
                handleAddBookMark(props.id, BOOK_ACTION_TYPE.ADD);
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
              handleAddBookMark(props.id, BOOK_ACTION_TYPE.REMOVE);
            }}
          />
        )}
      </section>
    </>
  );
}

export default AddBookMarks;
