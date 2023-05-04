import React, { useEffect, useState } from "react";
import DealList from "../DealList/DealList";

function LatestDealList(props) {

  const [filteredList, setFilteredList] = useState(null);

  // ------here i am filtering the deal list which one need to show-------
  useEffect(() => {
    function filterDeal() {
      if (props.dealList && props.dealList.length > 0) {
        const getFilterData = props.dealList.filter(
          (value, index) => value.id == props.eventKeyValue
        );
        getFilterData.length > 0 && setFilteredList(getFilterData[0].dealList);
      }
    }
    filterDeal();
  }, [props]);

  return (
    <>
      <DealList fromDeal={true} dealList={filteredList} />
    </>

  );
}

export default LatestDealList;
