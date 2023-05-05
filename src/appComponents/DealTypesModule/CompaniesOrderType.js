import styles from './CompanyData.module.css';
import { useEffect, useState } from 'react';
import { STATUS_CODES } from "../../utils/StatusCode";
import SublyApi from '../../helpers/Api';
import { useSelector } from 'react-redux';
import Loader from '../../utils/Loader/Loader';
import { Toast } from "../../utils/Toaster";
import { useNavigate } from 'react-router-dom';

//  -------function for display product list------
function CompanyOrderType(props) {
    const navigate = useNavigate();
    const [companyList, setcompanyList] = useState("");
    const [loader, setLoader] = useState(false);
    const { userToken } = useSelector((state) => state.user);

    // --------function for get company details----------
    const companyValue = { company_order: props.companyList }
    useEffect(() => {
        async function companyList() {
            setLoader(true);
            const details = await SublyApi.getDealList(
                userToken,
                companyValue
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
                setLoader(false);
            }
        }
        companyList("companyList", companyList);
    }, [props]);

    return (
        <>
            {loader ? (
                <div className="loader">
                    <Loader />
                </div>
            ) : null}
            {companyList ?
                <div>
                    {companyList.length > 0
                        ? companyList.map((item, index) => (
                            <div className={styles.productslist} key={index}
                                onClick={() => { navigate(`/deals/latest-deals/company-profile/${item.id}`) }}>
                                <div className={styles.productImg}>
                                    <img src={item.company_logo} alt="logo" />
                                </div>
                                <div className={styles.productDiscription}>
                                    <h3>{item.name}</h3>
                                    <p>{item.address}</p>
                                    <h5>{item.deal_count} Deals</h5>
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