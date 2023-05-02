import { useSelector } from "react-redux";
import { useState } from "react";
import { REFERENCE_TYPE } from "../../../utils/Constants";
import CompanyList from "../CompanyList";

// -----------function for display brands------------
function Brands() {
    const { allDeals, isLoading } = useSelector((state) => state.deal);
    const [companyList, setCompanyList] = useState(allDeals.brand_company_count_list);
    const refrenceType = REFERENCE_TYPE.BRANDS;

    return (
        <>
            <CompanyList companyList={companyList} refrenceType={refrenceType} />
        </>
    );
}
export default Brands;