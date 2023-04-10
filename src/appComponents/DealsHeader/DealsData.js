/** @format */
import { t } from "i18next";
import Icon1 from "../../assets/images/icon1.png";
import Icon2 from "../../assets/images/icon2.png";
import Icon3 from "../../assets/images/icon3.png";
import Icon4 from "../../assets/images/icon4.png";
import Icon5 from "../../assets/images/icon5.png";

export const dealsData = [
    {
        id: "1",
        text: `${t("LALEST_DEALS")}`,
        link: `/latest-deals`,
        icon: `${Icon1}`,
    },
    {
        id: "2",
        text: `${t("PRODUCTS")}`,
        link: `/products`,
        // link: `javascript:;`,
        icon: `${Icon2}`,
    },
    {
        id: "3",
        text: `${t("SERVICES")}`,
        link: `javascript:;`,
        // link: `/services`,
        icon: `${Icon3}`,
    },
    {
        id: "4",
        text: `${t("BRANDS")} `,
        // link: `/brands`,
        link: `javascript:;`,
        icon: `${Icon4}`,
    },
    {
        id: "5",
        text: `${t("COMPANIES")} `,
        // link: `/companies`,
        link: `javascript:;`,
        icon: `${Icon5}`,
    },
];

export default dealsData;




