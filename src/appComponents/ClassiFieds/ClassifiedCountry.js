import React, { useState } from "react";
import mapicon from "../../assets/images/map_ico.png";
import "../ClassiFieds/ClassiFieds.css";
import { useTranslation } from "react-i18next";
import styles from "./ClassifiedCountry.module.css";
import ClassifiedFilter from "./ClassifiedFilter";
import { useDispatch, useSelector } from "react-redux";
import { setClassfiedType } from "../../store/slices/ClassifiedSlice";
import { CLASSIFIED_CATEGORY_TYPE } from "../../utils/Constants";

function ClassifiedCountry() {
  function closeModal() {
    return setIsOpen(false);
  }
  const { forSaleTotalCount, wantedTotalCount } = useSelector(
    (state) => state.classified
  );

  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [countryData, setCountryData] = useState("");
  console.log("countryData", countryData);

  return (
    <div className={styles.classiFieds_map_serchbar}>
      <div className={styles.countryIcon} onClick={() => setIsOpen(true)}>
        <div className={styles.imgIcon}>
          <img src={mapicon} alt={mapicon} width="25px" height="25px" />{" "}
        </div>
        <div className={styles.countryText}>
          {countryData.label ? (
            <div className={styles.countryText}>
              {countryData.label} -
              <span className={styles.resultText}>
                {forSaleTotalCount} Results
              </span>{" "}
            </div>
          ) : (
            <p>
              All South Africa - <span> 0 Result</span>
            </p>
          )}
        </div>
      </div>
      {isOpen && (
        <ClassifiedFilter
          closeModal={closeModal}
          setCountryData={setCountryData}
        />
      )}
    </div>
  );
}
export default ClassifiedCountry;
