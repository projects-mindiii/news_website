import React, { useEffect, useState } from "react";
import CompanyData from "../DealTypesModule/CompanyData.js";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { BOOK_TYPE } from "../../utils/Constants";
import ClassifiedCategoryList from "../ClassiFieds/ClassifiedCategoryList";
import DealList from "../DealModule/DealList/DealList.js";

function SearchList() {
  const { searchList } = useSelector((state) => state.search);

  return (
    <>
      <section className="main">
        <Container>
          <div>
            <Row>
              <Col xs={12} sm={12} md={12} lg={6}>
                {searchList &&
                  searchList.map((item, index) => {
                    if (item.refrence_type == 3) {
                      return (
                        <DealList fromDeal={true} dealList={item.detail} />
                      );
                    }  else if (item.refrence_type == 1) {
                      return (
                        <ClassifiedCategoryList
                          // displayRoute="your_advert"
                          forSaleListData={item.detail}
                          classifiedDataType={4}
                          bookType={BOOK_TYPE.CLASSIFIED}
                        />
                      );
                    }
                  })}
              </Col>
            </Row>
          </div>
        </Container>
      </section>
    </>
  );
}
export default SearchList;
