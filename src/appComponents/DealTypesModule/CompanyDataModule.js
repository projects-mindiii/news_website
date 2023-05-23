import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CompanyData.module.css";

function CompanyDataModule({ companyListValue }) {
  const navigate = useNavigate();

  return (
    <section>
      <div
        className={styles.productslist}
        onClick={() => {
          navigate(
            `/deals/latest-deals/company-profile/${companyListValue.id}`
          );
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
