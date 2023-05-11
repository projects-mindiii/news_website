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
    const { userToken } = useSelector((state) => state.user);
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
                                onClick={() => { navigate(`/deals/latest-deals/company-profile/${item.id}`) }}>
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
                                            {item.deal_count > 1 ? " Deals" : " Deal"}
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