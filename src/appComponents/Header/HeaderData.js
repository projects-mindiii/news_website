/** @format */

import { t } from "i18next";

export const headerData = [
    {
        id: "1",
        text: `${t("DEALS")}`,
        // link: `javascript:;`,
        link: `/deals/latest-deals`,
        activeClass: `active`,


    },
    {
        id: "2",
        text: `${t("CLASSIFIEDS")}`,
        // link: `javascript:;`,
        link: `/classified`,
        activeClass:""
    },
    {
        id: "3",
        text: `${t("JOBS")}`,
        link: `javascript:;`,
        activeClass:""
        // link: `/job`,
    },
    {
        id: "4",
        text: `${t("POST_ADVERT")} `,
        link: `javascript:;`,
        activeClass:""
        // link: `/post`,
    },
    {
        id: "5",
        text: `${t("YOUR_ADS")} `,
        link: `javascript:;`,
        activeClass:""
        // link: `/ads`,
    },
];


export default headerData;




