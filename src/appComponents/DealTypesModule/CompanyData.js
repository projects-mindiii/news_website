import styles from './CompanyData.module.css';
import { useEffect, useState } from 'react';
import { STATUS_CODES } from "../../utils/StatusCode";
import SublyApi from '../../helpers/Api';
import { useSelector } from 'react-redux';
import Loader from '../../utils/Loader/Loader';
import { Toast } from "../../utils/Toaster";
import { useNavigate } from 'react-router-dom';

//  -------function for display company list of products ,services and brands------
function CompanyData(props) {
    const navigate = useNavigate();
    const [companyList, setcompanyList] = useState("");
    const { userToken } = useSelector((state) => state.user);

    // --------function for get company details----------
    const companyValue = { refrence_id: props.referenceId, refrence_type: props.refrenceType }
    useEffect(() => {
        async function companyList() {
            const details = await SublyApi.getCompanyList(
                userToken,
                companyValue
            );
            if (details.status_code == STATUS_CODES.SUCCESS) {
                setcompanyList(details.data);
            }
            else {
                Toast.fire({
                    icon: "error",
                    title: details.data.message,
                });
            }
        }
        companyList();
    }, [props]);

    return (
        <>
            {companyList ?
                <div>
                    <div className={styles.products}>
                        <h2>{companyList.detail.name} - <span>{companyList.total_count} Results</span></h2>
                    </div>

                    {companyList.list.length > 0
                        ? companyList.list.map((item, index) => (
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
                : <Loader />}
        </>
    );
}
export default CompanyData;