import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { BOOK_TYPE, SERACH_REFRENCE_TYPE } from "../../utils/Constants";
import ClassifiedCategoryList from "../ClassiFieds/ClassifiedCategoryList";
import DealList from "../DealModule/DealList/DealList.js";
import CompanyDataModule from "../DealTypesModule/CompanyDataModule.js";
import { useTranslation } from "react-i18next";
import Loader from "../../utils/Loader/Loader";
import CustomBtn from "../../formComponent/Button/Button";
import { useNavigate } from "react-router-dom";
import { guestUserLogin, userLogout } from "../../store/slices/UserSlice";
import { searchListApi } from "../../store/slices/SearchSlice";
import { STATUS_CODES } from "../../utils/StatusCode";
import { PAGINATION_VALUE } from "../../utils/Constants";

function SearchList() {
  const { userToken } = useSelector((state) => state.user);
  const { searchList, isLoading, searchValue, searchTotalCount } = useSelector(
    (state) => state.search
  );
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [offset, setOffset] = useState(PAGINATION_VALUE.DEFAULT_LIMIT);

  // ====manage load more pagination and calling api of search====
  function Loadmore(isLoadmore) {
    const searchValues = {
      limit: PAGINATION_VALUE.DEFAULT_LIMIT,
      offset: offset,
      search: searchValue,
    };
    dispatch(
      searchListApi({
        userToken: userToken,
        searchValues,
        Loadmore: isLoadmore,
      })
    ).then(async (responsejson) => {
      if (responsejson.response.status_code) {
        if (responsejson.response.status_code === STATUS_CODES.INVALID_TOKEN) {
          dispatch(userLogout(userToken)).then(() => {
            dispatch(guestUserLogin());
            navigate("/login");
          })
        }
      } else {
        if (responsejson.response.status === STATUS_CODES.INVALID_TOKEN) {
          dispatch(userLogout(userToken)).then(() => {
            dispatch(guestUserLogin());
            navigate("/login");
          })
        }
      }
    });
  }

  return (
    <>
      {isLoading ? <Loader /> : ""}
      <section className="main">
        <Container className="screenOverride">
          <div className="searchModuleBox">
            <Row>
              <Col xs={12} sm={12} md={12} lg={6}>
                {searchList
                  ? searchList.map((item, index) => {
                    if (item.refrence_type == SERACH_REFRENCE_TYPE.DEAL) {
                      return (
                        <div className="searchedComponent">
                          <DealList fromDeal={true} dealList={item.detail} />
                        </div>
                      );
                    } else if (
                      item.refrence_type == SERACH_REFRENCE_TYPE.COMPANY
                    ) {
                      return (
                        <div className="searchedComponent">
                          <CompanyDataModule
                            companyListValue={item.detail[0]}
                          />
                        </div>
                      );
                    } else if (
                      item.refrence_type == SERACH_REFRENCE_TYPE.CLASSIFIED
                    ) {
                      return (
                        <div className="searchedComponent">
                          <ClassifiedCategoryList
                            // displayRoute="your_advert"
                            forSaleListData={item.detail}
                            classifiedDataType={4}
                            bookType={BOOK_TYPE.CLASSIFIED}
                          />
                        </div>
                      );
                    }
                  })
                  : ""}
                {searchList.length >= searchTotalCount ? (
                  ""
                ) : (
                  <div className="marginTop">
                    {" "}
                    <CustomBtn
                      children={t("LOAD_MORE")}
                      onClick={() => {
                        Loadmore(true);
                        setOffset(offset + PAGINATION_VALUE.DEFAULT_LIMIT);
                      }}
                      type={"button"}
                    />{" "}
                  </div>
                )}
              </Col>
              {searchList.length == 0 && (
                <h4 className="displayNoText">{t("NO_SEARCH_DATA")}</h4>
              )}
            </Row>
          </div>
        </Container>
      </section>
    </>
  );
}
export default SearchList;
