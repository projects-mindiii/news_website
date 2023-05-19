import styles from "../ClassiFieds/ClassifiedCountry.module.css";
import { useTranslation } from "react-i18next";

function SearchTotalCount() {
    const { t } = useTranslation();
  return (
    <>
      <div className={styles.countryIcon}>
        <div className={styles.countryText}>
            <span className={styles.resultText}>
              0 {t("CLASSIFIED_LIST_RESULT")}
            </span>
          
        </div>
      </div>
    </>
  );
}

export default SearchTotalCount;
