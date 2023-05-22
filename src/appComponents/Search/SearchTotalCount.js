import { useSelector } from "react-redux";
import styles from "../ClassiFieds/ClassifiedCountry.module.css";
import { useTranslation } from "react-i18next";

function SearchTotalCount() {
    const { t } = useTranslation();
    const { searchTotalCount } = useSelector((state) => state.search);

  return (
    <>
      <div className={styles.countryIcon}>
        <div className={styles.countryText}>
            <span className={styles.resultText}>
              {searchTotalCount} {t("CLASSIFIED_LIST_RESULT")}
            </span>
          
        </div>
      </div>
    </>
  );
}

export default SearchTotalCount;
