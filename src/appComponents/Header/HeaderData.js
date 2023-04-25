/** @format */

import { t } from "i18next";

export const headerData = [
    {
        id: "1",
        text: `${t("DEALS")}`,
        link: `/deals/latest-deals`,
        activeClass: `active`,


    },
    {
        id: "2",
        text: `${t("CLASSIFIEDS")}`,
         link: `/classifieds`,
        activeClass:""
    },
    {
        id: "3",
        text: `${t("JOBS")}`,
        link: `/job-types`,
        activeClass:""
       
    },
    {
        id: "4",
        text: `${t("POST_ADVERT")} `,
        link: `/Post-advert`,
        activeClass:""
        
    },
    {
        id: "5",
        text: `${t("YOUR_ADS")} `,
        link: `/Your-add`,
        activeClass:""
       
    },
];


export default headerData;




