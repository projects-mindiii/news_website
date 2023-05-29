import styles from './CompanyData.module.css';
import { useEffect, useState } from 'react';
import { STATUS_CODES } from "../../utils/StatusCode";
import SublyApi from '../../helpers/Api';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../utils/Loader/Loader';
import { Toast } from "../../utils/Toaster";
import { useNavigate } from 'react-router-dom';
import { COUNT, COUNT_REFFRENCE } from "../../utils/Constants";
import { useTranslation } from "react-i18next";
import { guestUserLogin, userLogout } from "../../store/slices/UserSlice";

//  -------function for display product list------
function CompanyOrderType(props) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [companyList, setcompanyList] = useState("");
    const { userToken, currentUser } = useSelector((state) => state.user);
    const [loader, setLoader] = useState(false);

    // --------function for get company details----------
    const companyValue = { company_order: props.companyList }
    useEffect(() => {
        async function companyList() {
            setLoader(true);
            const details = await SublyApi.getDealList(
                userToken,
                companyValue.company_order
            );

            if (details.status_code == STATUS_CODES.SUCCESS) {
                setcompanyList(details.data.company_deal_count_list);
                setLoader(false);
            }
            else {
                Toast.fire({
                    icon: "error",
                    title: details.data.message,
                });
            }
        }
        companyList("companyList", companyList);
    }, [props]);

    //------ function for share view count-------
    async function handleCount(id) {
        let requestData = new FormData();
        requestData.append("id", id);
        requestData.append("type", COUNT.VIEW);
        requestData.append("refrence_type", COUNT_REFFRENCE.COMPANY);
        requestData.append("share_in", 0);
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
        <>
            {companyList ?
                <div>
                    {loader ? (
                        <div className="loader">
                            <Loader />
                        </div>
                    ) : null}
                    {companyList.length > 0
                        ? companyList.map((item, index) => (
                            <div className={styles.productslist} key={index}
                                onClick={() => {
                                    if (
                                        Object.keys(currentUser).length !== 0
                                    ) {
                                        handleCount(item.id)
                                        navigate(`/deals/companies/company-profile/${item.id}`)
                                    } else if (!Object.keys(currentUser).length) {
                                        navigate(`/deals/companies/company-profile/${item.id}`)
                                    }
                                }}>
                                <div className={styles.productImg}>
                                    <img src={item.company_logo} alt="logo" />
                                </div>
                                <div className={styles.productDiscription}>
                                    {item.name &&
                                        <h3>{item.name}</h3>}
                                    {item.address &&
                                        <p>{item.address}</p>}

                                    {item.deal_count > 0 ?
                                        <h5>{item.deal_count}
                                            {item.deal_count > 1 ? `${t("DEALS_TEXT")}` : `${t("DEAL")}`}
                                        </h5> : ""
                                    }
                                </div>
                            </div>
                        ))
                        : ""}
                </div>
                : ""}
        </>
    );
}
export default CompanyOrderType;