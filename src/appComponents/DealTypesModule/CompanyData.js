import styles from "./CompanyData.module.css";
import { useEffect, useState } from "react";
import { STATUS_CODES } from "../../utils/StatusCode";
import SublyApi from "../../helpers/Api";
import { useSelector } from "react-redux";
import Loader from "../../utils/Loader/Loader";
import { Toast } from "../../utils/Toaster";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import CustomBtn from "../../formComponent/Button/Button";
import { useTranslation } from "react-i18next";
import { PAGINATION_VALUE } from "../../utils/Constants";

//  -------function for display company list of products ,services and brands------
function CompanyData(props) {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(); 
  const [companyList, setcompanyList] = useState("");
  const [companyListValue, setCompanyListValue] = useState(null);
  const { userToken } = useSelector((state) => state.user);
  const [loader, setLoader] = useState(false);
  const [limit, setLimit] = useState(PAGINATION_VALUE.DEFAULT_LIMIT);
  const [offset, setOffset] = useState(PAGINATION_VALUE.DEFAULT_OFFSET);

  // --------function for get company details----------

  async function companyListHandle(loadmore, offsetValue) {
    const companyValue = {
      refrence_id: props.referenceId,
      refrence_type: props.refrenceType,
      limit: limit,
      offset: offsetValue,
    };
    setLoader(true);
    const details = await SublyApi.getCompanyList(userToken, companyValue);
    if (details.status_code == STATUS_CODES.SUCCESS) {
      if (loadmore == true) {
        setCompanyListValue(companyListValue.concat(details.data.list));
      } else {
        setCompanyListValue(details.data.list);
      }
      setcompanyList(details.data);

      setLoader(false);
    } else {
      Toast.fire({
        icon: "error",
        title: details.data.message,
      });
    }
  }

  function loadmore() {
    setOffset(offset + PAGINATION_VALUE.DEFAULT_LIMIT);
    companyListHandle(true, offset + PAGINATION_VALUE.DEFAULT_LIMIT);
  }


  useEffect(() => {
    companyListHandle(false, PAGINATION_VALUE.DEFAULT_OFFSET);
    setOffset(PAGINATION_VALUE.DEFAULT_OFFSET);
  }, [props]);

  return (
    <>
      {companyList ? (
        <div>
          {loader ? (
            <div className="loader">
              <Loader />
            </div>
          ) : null}
          <div className={styles.products}>
            <h2>
              {companyList.detail.name} -{" "}
              <span>{companyList.total_count} Results</span>
            </h2>
          </div>

          {companyListValue.length > 0
            ? companyListValue.map((item, index) => (
                <div
                  className={styles.productslist}
                  key={index}
                  onClick={() => {
                    navigate(`/deals/latest-deals/company-profile/${item.id}`);
                  }}
                >
                  <div className={styles.productImg}>
                    <img src={item.company_logo} alt="logo" />
                  </div>
                  <div className={styles.productDiscription}>
                    {item.name && <h3>{item.name}</h3>}
                    {item.address && <p>{item.address}</p>}

                    {item.deal_count > 0 ? (
                      <h5>
                        {item.deal_count}
                        {item.deal_count > 1 ? " Deals" : " Deal"}
                      </h5>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ))
            : ""}
          {companyListValue.length >= companyList.total_count ? (
            " "
          ) : (
            <CustomBtn
              children={t("LOAD_MORE")}
              type={"button"}
              onClick={() => loadmore()}
            />
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
}
export default CompanyData;
