import { useDispatch, useSelector } from "react-redux";
import styles from "../ClassiFieds/ClassifiedCountry.module.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { clearSearchData } from "../../store/slices/SearchSlice";

function SearchTotalCount() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchTotalCount } = useSelector((state) => state.search);

  return (
    <>
      <div className={`${styles.countryIcon} backBtnSearch`}>
        <div className="backarrowButton">
          <MdOutlineKeyboardArrowLeft
            onClick={() => {
              navigate(-1);
              dispatch(clearSearchData());
            }}
            className="mt-0"
          />
        </div>
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
