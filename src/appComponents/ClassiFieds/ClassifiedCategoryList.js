import mapicon from "../../assets/images/map_ico.svg";
import React, { useEffect } from "react";
import "../ClassiFieds/ClassiFieds.css";
import WhatsApp from "../../CommonComponent/Whatappshare";
import SocialMedaiShare from "../../CommonComponent/SocialMediaShare";
import ContactPerson from "../../CommonComponent/ContactPerson";
import watchicon from "../../assets/images/watch_ico.png";
import { CLASSIFIED_CATEGORY_TYPE } from "../../utils/Constants";
import AddBookmarks from "../Bookmarks/AddBookmarks";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SublyApi from "../../helpers/Api";
import { Toast } from "../../utils/Toaster";
import { useDispatch, useSelector } from "react-redux";
import { COUNT, COUNT_REFFRENCE } from "../../utils/Constants";
import { STATUS_CODES } from "../../utils/StatusCode";
import { guestUserLogin, userLogout } from "../../store/slices/UserSlice";

function ClassifiedList({
  forSaleListData,
  bookType,
  item,
  index,
  displayRoute,
}) {

  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userToken, currentUser } = useSelector((state) => state.user);


  // useEffect(() => {
  //   if (Object.keys(currentUser).length !== 0) {
  //     async function handleCount() {
  //       {
  //         forSaleListData && forSaleListData.length > 0 &&
  //         forSaleListData.map((item, index) => {
  //             let requestData = new FormData();
  //             requestData.append("id", item.id);
  //             requestData.append("type", COUNT.VIEW);
  //             requestData.append("refrence_type", COUNT_REFFRENCE.CLASSIFIED);
  //             requestData.append("share_in", 0);
  //             SublyApi.updateCount(requestData, userToken).then((responsejson) => {
  //               if (responsejson.status_code === STATUS_CODES.SUCCESS) {

  //               } else if (responsejson.status === STATUS_CODES.INVALID_TOKEN) {
  //                 Toast.fire({
  //                   icon: "error",
  //                   title: t("SESSION_EXPIRE"),
  //                 });
  //                 dispatch(userLogout(userToken));
  //                 dispatch(guestUserLogin());
  //                 navigate("/login");
  //               }
  //             })
  //           })
  //       }
  //     }
  //     handleCount();
  //   }
  // }, []);


  return (
    <div className="classiFieds_forSaleBox">
      <div className="classiFieds_forSale_about">
        <div className="classiFieds_forSale">
          <img src={item.img_url} alt={item.img_url} />
        </div>
        <div className="classiFields_heading">
          <p className="text">{item.heading.toUpperCase()}</p>
          <div className="classiFieds_time_action">
            <div className="classiFieds_time">
              <button
                className="classiFieds_forSale_button"
                style={{
                  background: `linear-gradient(to right, ${item.color_code.start_color}, ${item.color_code.end_color})`,
                  color: `text-color(to text color, ${item.color_code.text_color})`,
                }}
              >
                {item.category_name}
              </button>

              <span>
                <img src={watchicon} alt={watchicon} />{" "}{item.created_date}
              </span>
            </div>
            <div className="classiFieds_bookmarkicon">
              {displayRoute && displayRoute == "bookmark" ? (
                <AddBookmarks
                  isBookmark={item.is_bookmark}
                  id={item.refrence_id}
                  bookType={bookType}
                  isApproved={item.approval_status}
                />
              ) : (
                <AddBookmarks
                  isBookmark={item.is_bookmark}
                  id={item.id}
                  bookType={bookType}
                  isApproved={item.approval_status}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {item.category_type_id == CLASSIFIED_CATEGORY_TYPE.JOBOFFER ||
        item.category_type_id == CLASSIFIED_CATEGORY_TYPE.JOBSEEKERS ? (
        <div className="jobType">
          <p>
            {item.job_type_name ? item.job_type_name + `-` : ""}
            {item.job_location_type_name}
          </p>
        </div>
      ) : (
        ""
      )}
      {item.category_type_id == CLASSIFIED_CATEGORY_TYPE.FORSALE ||
        item.category_type_id == CLASSIFIED_CATEGORY_TYPE.JOBOFFER ? (
        <div className="classiFieds_RupeesText">
          {item.amount === 0 ? "" : item.amount && <p>
            {item.currency_code} {item.amount.toFixed(2)}
          </p>}
          <span>
            {item.category_type_id == CLASSIFIED_CATEGORY_TYPE.JOBOFFER
              ? item.earning_name.toUpperCase()
              : item.currency_name.toUpperCase()}
            {item.is_negotiable ? "(NEGOTIABLE)" : ""}
          </span>
        </div>
      ) : (
        ""
      )}

      <div className="classiFieds_countryName ">
        <span>
          <img src={mapicon} alt={mapicon} />
          <span>
            {item.city ? item.city : ""}
            {item.province_name ? ", " + item.province_name : ""}
            {item.country_name ? ", " + item.country_name : ""}
          </span>
        </span>
      </div>
      <div className="classiFieds_aboutText">
        <p>{item.description}</p>
      </div>
      <div className="classiFields_contactPerson">
        <ContactPerson forSaleListData={forSaleListData} index={index} />
        {item.whatapp_contact_number.length > 0 && <WhatsApp watsApp={true} />}
      </div>

      <SocialMedaiShare />

      {(displayRoute && displayRoute == "your_advert") ? (<button className="edit_DeleteButton" onClick={() => navigate("/post-advert", { state: item })}>{t("EDIT_DELETE_BTN")}</button>) : ""}
      {(displayRoute && displayRoute == "your_advert" && item.approval_status == 0) ? (<button className="not_live">{t("PENDING_APPROVAL")}</button>) : ""}
    </div>
  );
}
function ClassifiedCategoryList({ forSaleListData, bookType, displayRoute }) {
  if (displayRoute && displayRoute == "your_advert") {
    let approveForSaleListData = forSaleListData.filter((a) => a.approval_status == 1);
    let pendingForSaleListData = forSaleListData.filter((a) => a.approval_status == 0);
    forSaleListData = approveForSaleListData.concat(pendingForSaleListData);
  }

  return (
    <div className="main">
      {forSaleListData &&
        forSaleListData.length > 0 &&
        forSaleListData.map((item, index) => {
          if (displayRoute && displayRoute == "your_advert") {
            return (
              <ClassifiedList
                displayRoute="your_advert"
                key={index}
                index={index}
                item={item}
                forSaleListData={forSaleListData}
                bookType={bookType}
              ></ClassifiedList>
            );
          } else if (displayRoute && displayRoute == "bookmark") {
            return (
              <ClassifiedList
                displayRoute="bookmark"
                key={index}
                index={index}
                item={item}
                forSaleListData={forSaleListData}
                bookType={bookType}
              ></ClassifiedList>
            );
          } else {
            return (
              <ClassifiedList
                key={index}
                index={index}
                item={item}
                forSaleListData={forSaleListData}
                bookType={bookType}
              ></ClassifiedList>
            );
          }
        })}

    </div>
  );
}

export default ClassifiedCategoryList;
