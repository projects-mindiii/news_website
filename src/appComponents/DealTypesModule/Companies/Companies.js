import { useState } from "react";
import CompanyList from "../CompanyList";
import { useTranslation } from "react-i18next";

// -----------function for display services------------
function Companies() {
    //set language
    const { t } = useTranslation();
    const companyOrderType = [
        {
            "id": 1,
            "name": `${t("RECENT")}`,
            "company_count": "company_order"
        },
        {
            "id": 2,
            "name": `${t("ALPHABETICAL")}`,
            "company_count": "company_order"
        }
    ]
    const [companyList, setCompanyList] = useState(companyOrderType);

    return (
        <>
            <CompanyList companyList={companyOrderType} />
        </>
    );
}
export default Companies;