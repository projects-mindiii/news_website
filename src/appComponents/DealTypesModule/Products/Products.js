import { useSelector } from "react-redux";
import { useState } from "react";
import CompanyList from "../CompanyList";
import { REFERENCE_TYPE } from "../../../utils/Constants";

// -----------function for display products------------
function Products() {
    const { allDeals } = useSelector((state) => state.deal);
    const [companyList, setCompanyList] = useState(allDeals.product_company_count_list);
    const refrenceType = REFERENCE_TYPE.PRODUCTS;

    return (
        <>
            <CompanyList companyList={companyList} refrenceType={refrenceType} />
        </>
    );
}
export default Products;