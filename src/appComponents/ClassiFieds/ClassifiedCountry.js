import React, { useState} from "react";
import mapicon from "../../assets/images/map_ico.png";
import "../ClassiFieds/ClassiFieds.css";
import { useTranslation } from "react-i18next";
import styles from './ClassifiedCountry.module.css';
import ClassifiedFilter from "./ClassifiedFilter";

function ClassifiedCountry() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.classiFieds_map_serchbar}>
      <div className={styles.countryIcon} onClick={() => setIsOpen(true)}>
        <span className={styles.imgIcon}>
          {" "}
          <img src={mapicon} alt={mapicon} width="25px" height="25px" />
          <span className={styles.countryText}>
            All South Africa -<span className={styles.resultText}>0 Results</span>{" "}
            {isOpen && <ClassifiedFilter/>}
          </span>
        </span>
      </div>
    </div>
  );
  
}
export default ClassifiedCountry;
