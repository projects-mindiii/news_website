import { useSelector } from "react-redux";
import { useState } from "react";
import CompanyList from "../CompanyList";
import { REFERENCE_TYPE } from "../../../utils/Constants";

// -----------function for display services------------
function Services() {
    const { allDeals, isLoading } = useSelector((state) => state.deal);
    const [companyList, setCompanyList] = useState(allDeals.service_company_count_list);
    const refrenceType = REFERENCE_TYPE.SERVICES;

    return (
        <>
            <CompanyList companyList={companyList} refrenceType={refrenceType} />
        </>
    );
}
export default Services;