import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { BOOK_TYPE, SERACH_REFRENCE_TYPE } from "../../utils/Constants";
import ClassifiedCategoryList from "../ClassiFieds/ClassifiedCategoryList";
import DealList from "../DealModule/DealList/DealList.js";
import CompanyDataModule from "../DealTypesModule/CompanyDataModule.js";
import { useTranslation } from "react-i18next";

function SearchList() {
  const { searchList } = useSelector((state) => state.search);
  const { t } = useTranslation();

  return (
    <>
      <section className="main">
        <Container>
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
                            <CompanyDataModule companyListValue={item.detail[0]} />
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
