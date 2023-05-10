import React, { useState } from "react";
import mapicon from "../../assets/images/map_ico.png";
import "../ClassiFieds/ClassiFieds.css";
import { useTranslation } from "react-i18next";
import styles from "./ClassifiedCountry.module.css";
import ClassifiedFilter from "./ClassifiedFilter";

function ClassifiedCountry() {
  function closeModal() {
    return setIsOpen(false);
  }
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [countryData, setCountryData] = useState("");
  const [resultData, setResultData] = useState("");

  return (
    <div className={styles.classiFieds_map_serchbar}>
      <div className={styles.countryIcon} onClick={() => setIsOpen(true)}>
        <div className={styles.imgIcon}>
          <img src={mapicon} alt={mapicon} width="25px" height="25px" />{" "}
        </div>
        <div className={styles.countryText}>
          {countryData.label ? (
            <div className={styles.countryText}>
              <p className={styles.selectText}>{countryData.label} - </p>
              <span className={styles.resultText}>
                {resultData} {t("CLASSIFIED_LIST_RESULT")}
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
          setCountryData={setCountryData}
          setResultData={setResultData}
        />
      )}
    </div>
  );
}
export default ClassifiedCountry;
