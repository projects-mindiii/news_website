import React, { useState } from "react";
import { Icon } from "@iconify/react";
import SublyApi from "../../helpers/Api";
import { useSelector, useDispatch } from "react-redux";
import { STATUS_CODES } from "../../utils/StatusCode";
import { BOOK_ACTION_TYPE } from "../../utils/Constants";
import { Toast } from "../../utils/Toaster";
import {
  addBookMarkApi,
  bookMarkListApi,
} from "../../store/slices/BookMarkSlice";

function AddBookMarks(props) {
  console.log("props value", props);
  const dispatch = useDispatch();
  const [is_book, setIs_book] = useState(1);
  const { userToken, isLoading } = useSelector((state) => state.user);

  async function handleAddBookMark(id, action) {
    const requestData = new FormData();
    requestData.append("id", id);
    requestData.append("status", action);
    requestData.append("type", props.bookType);
    dispatch(
      addBookMarkApi({ userToken: userToken, requestData: requestData })
    ).then((response) => {
      console.log("response payload", response.payload);
      if (response.payload.status_code == STATUS_CODES.SUCCESS) {
        if (action == BOOK_ACTION_TYPE.ADD) {
          setIs_book(2);
          Toast.fire({
            icon: "success",
            title: response.payload.message,
          });
          const requiredValue = { limit: 10, offset: 0 };
          dispatch(bookMarkListApi({ userToken: userToken, requiredValue }));
        } else {
          setIs_book(1);
          Toast.fire({
            icon: "success",
            title: response.payload.message,
          });
          const requiredValue = { limit: 10, offset: 0 };
          dispatch(bookMarkListApi({ userToken: userToken, requiredValue }));
        }
      } else if (response.payload.status == STATUS_CODES.BAD_REQUEST) {
        Toast.fire({
          icon: "error",
          title: response.payload.data.message,
        });
      }
    });
  }
  return (
    <section>
      {props.isBookmark == 0 && is_book == 1 ? (
        <Icon
          icon="ic:baseline-bookmark-border"
          color="black"
          width="28"
          height="28"
          cursor={"pointer"}
          onClick={() => {
            handleAddBookMark(props.id, BOOK_ACTION_TYPE.ADD);
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
  );
}

export default AddBookMarks;
