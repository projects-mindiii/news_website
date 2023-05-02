import styles from './CompanyData.module.css';
import { useEffect, useState } from 'react';
import { STATUS_CODES } from "../../utils/StatusCode";
import SublyApi from '../../helpers/Api';
import { useSelector } from 'react-redux';
import Loader from '../../utils/Loader/Loader';


//  -------function for display product list------
function CompanyData(props) {
    const [companyList, setcompanyList] = useState("");
    const { userToken, isLoading } = useSelector((state) => state.user);

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
        }
        companyList();
    }, [props]);


    return (
        <>
            {isLoading === true ? (
                <Loader />
            ) : ""}
            {companyList ?
                <div>
                    <div className={styles.products}>
                        <h2>{companyList.detail.name} - <span>{companyList.total_count} Results</span></h2>
                    </div>

                    {companyList.list.length > 0
                        ? companyList.list.map((item, index) => (
                            <div className={styles.productslist} key={index}>
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
export default CompanyData;