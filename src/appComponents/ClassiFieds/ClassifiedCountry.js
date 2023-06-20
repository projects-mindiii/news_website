import React, { useEffect, useState } from "react";
import mapicon from "../../assets/images/map_ico.svg";
import "../ClassiFieds/ClassiFieds.css";
import { useTranslation } from "react-i18next";
import styles from "./ClassifiedCountry.module.css";
import ClassifiedFilter from "./ClassifiedFilter";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function ClassifiedCountry() {
  const {
    classifiedFilterValues,
    jobSeekerTotalCount, jobOfferTotalCount, forSaleTotalCount, wantedTotalCount
  } = useSelector((state) => state.classified);
  function closeModal() {
    return setIsOpen(false);
  }

  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [resultData, setResultData] = useState("");
  const location = useLocation();

  useEffect(() => {
    closeModal();
  }, [location])

  return (
    <div className={styles.classiFieds_map_serchbar}>
      <div className={styles.countryIcon}>
        <div className={styles.imgIcon} >
          <img src={mapicon} onClick={() => setIsOpen(true)} alt={mapicon} width="25px" height="25px" />{" "}
        </div>
        <div className={styles.countryText}>
          {classifiedFilterValues ? (
            <div className={styles.countryText}>
              <p className={styles.selectText}>{classifiedFilterValues.name} - </p>
              <span className={styles.resultText}>
                {(location.pathname == "/job-types") ? (jobOfferTotalCount + jobSeekerTotalCount) : (forSaleTotalCount + wantedTotalCount)} {t("CLASSIFIED_LIST_RESULT")}
              </span>{" "}
            </div>
          ) : (
            <p>
              {t("COUNTRY_NAME")} -{" "}
              <span className={styles.resultText}> 0 {t("CLASSIFIED_LIST_RESULT")}</span>
            </p>
          )}
        </div>
      </div>
      {isOpen && (
        <ClassifiedFilter
          closeModal={closeModal}
          setResultData={setResultData}
          resultData={resultData}
        />
      )}
    </div>
  );
}
export default ClassifiedCountry;
