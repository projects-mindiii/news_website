import React, { useState } from "react";
import { Icon } from "@iconify/react";
import SublyApi from "../../helpers/Api";
import { useSelector } from "react-redux";
import { STATUS_CODES } from "../../utils/StatusCode";
import { BOOK_ACTION_TYPE } from "../../utils/Constants";
import { Toast } from "../../utils/Toaster";

function AddBookMarks(props) {
  console.log("props value", props);
  const [is_book, setIs_book] = useState(1);
  const { userToken, isLoading } = useSelector((state) => state.user);

  async function handleAddBookMark(id, action) {
    const requestData = new FormData();
    requestData.append("id", id);
    requestData.append("status", action);
    requestData.append("type", props.bookType);
    await SublyApi.addBookMark(userToken, requestData).then((response) => {
      console.log("response", response);
      if (response.status_code == STATUS_CODES.SUCCESS) {
        if (action == BOOK_ACTION_TYPE.ADD) {
          setIs_book(2);
          props.setUpdateList(Math.random());
          Toast.fire({
            icon: "success",
            title: response.message,
          });
        } else {
          setIs_book(1);
          Toast.fire({
            icon: "success",
            title: response.message,
          });
          props.setUpdateList(Math.random());
        }
      } else if (response.status == STATUS_CODES.BAD_REQUEST) {
        Toast.fire({
          icon: "error",
          title: response.data.message,
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
