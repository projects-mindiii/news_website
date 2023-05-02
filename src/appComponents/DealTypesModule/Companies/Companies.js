
import { useState } from "react";
import CompanyList from "../CompanyList";


// -----------function for display services------------
function Companies() {
  
    const companyOrderType=[
        {
            "id": 1,
            "name": "Recently Updated",
            "company_count": "company_order"
        },
        {
            "id": 2,
            "name": "Alphabetical",
            "company_count": "company_order"
        }
    ]
    const [companyList, setCompanyList] = useState(companyOrderType);
  

    return (
        <>
            <CompanyList companyList={companyOrderType}  />
        </>
    );
}
export default Companies;