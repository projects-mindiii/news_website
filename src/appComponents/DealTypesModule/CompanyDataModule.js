import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./CompanyData.module.css";
import SublyApi from "../../helpers/Api";
import { Toast } from "../../utils/Toaster";
import { useDispatch, useSelector } from "react-redux";
import { COUNT, COUNT_REFFRENCE, SHARE_COUNT } from "../../utils/Constants";
import { STATUS_CODES } from "../../utils/StatusCode";
import { useTranslation } from "react-i18next";
import { guestUserLogin, userLogout } from "../../store/slices/UserSlice";

function CompanyDataModule({ companyListValue }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userToken, currentUser } = useSelector((state) => state.user);

  //------ function for share view count-------
  async function handleCount() {
    let requestData = new FormData();
    requestData.append("id", companyListValue.id);
    requestData.append("type", COUNT.VIEW);
    requestData.append("refrence_type", COUNT_REFFRENCE.COMPANY);
    requestData.append("share_in", SHARE_COUNT.SHARE);
    await SublyApi.updateCount(requestData, userToken).then((responsejson) => {
      if (responsejson.status_code === STATUS_CODES.SUCCESS) {

      } else if (responsejson.status === STATUS_CODES.INVALID_TOKEN) {
        Toast.fire({
          icon: "error",
          title: t("SESSION_EXPIRE"),
        });
        dispatch(userLogout(userToken));
        dispatch(guestUserLogin());
        navigate("/login");
      }
    })
  }

  return (
    <section>
      <div
        className={styles.productslist}
        onClick={() => {
          // if (
          //   Object.keys(currentUser).length !== 0
          // ) {
          //   handleCount()
          //   navigate(`/deals/companies/company-profile/${companyListValue.id}`)
          // } else if (!Object.keys(currentUser).length) {
          //   navigate(`/deals/companies/company-profile/${companyListValue.id}`)
          // }

          navigate(`/deals/companies/company-profile/${companyListValue.id}`); handleCount()
        }}>

        <div className={styles.productImg}>
          <img src={companyListValue.company_logo} alt="logo" />
        </div>
        <div className={styles.productDiscription}>
          {companyListValue.name && <h3>{companyListValue.name}</h3>}
          {companyListValue.address && <p>{companyListValue.address}</p>}

          {companyListValue.deal_count > 0 ? (
            <h5>
              {companyListValue.deal_count}
              {companyListValue.deal_count > 1 ? `${t("DEALS_TEXT")}` : `${t("DEAL")}`}
            </h5>
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  );
}

export default CompanyDataModule;
