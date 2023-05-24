import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CompanyData.module.css";
import SublyApi from "../../helpers/Api";
import { Toast } from "../../utils/Toaster";
import { useSelector } from "react-redux";
import { COUNT, COUNT_REFFRENCE } from "../../utils/Constants";
import { STATUS_CODES } from "../../utils/StatusCode";

function CompanyDataModule({ companyListValue }) {
  const navigate = useNavigate();
  const { userToken } = useSelector((state) => state.user);

  //------ function for share view count-------
  async function handleCount() {
    let requestData = new FormData();
    requestData.append("id", companyListValue.id);
    requestData.append("type", COUNT.VIEW);
    requestData.append("refrence_type", COUNT_REFFRENCE.COMPANY);
    requestData.append("share_in", 0);
    await SublyApi.updateCount(requestData, userToken).then((responsejson) => {
      if (responsejson.status_code === STATUS_CODES.SUCCESS) {

      } else {
        Toast.fire({
          icon: "error",
          title: responsejson.data.message,
        });
      }
    })
  }

  return (
    <section>
      <div
        className={styles.productslist}
        onClick={() => {
          navigate(
            `/deals/latest-deals/company-profile/${companyListValue.id}`
          ); handleCount()
        }}
      >
        <div className={styles.productImg}>
          <img src={companyListValue.company_logo} alt="logo" />
        </div>
        <div className={styles.productDiscription}>
          {companyListValue.name && <h3>{companyListValue.name}</h3>}
          {companyListValue.address && <p>{companyListValue.address}</p>}

          {companyListValue.deal_count > 0 ? (
            <h5>
              {companyListValue.deal_count}
              {companyListValue.deal_count > 1 ? " Deals" : " Deal"}
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
