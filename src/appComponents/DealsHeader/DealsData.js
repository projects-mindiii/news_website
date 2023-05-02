/** @format */
import { t } from "i18next";
import Icon1 from "../../assets/images/icon1.svg";
import Icon2 from "../../assets/images/icon2.svg";
import Icon3 from "../../assets/images/icon3.svg";
import Icon4 from "../../assets/images/icon4.svg";
import Icon5 from "../../assets/images/icon5.svg";

export const dealsData = [
    {
        id: "1",
        text: `${t("LALEST_DEALS")}`,
        link: `/deals/latest-deals`,
        icon: `${Icon1}`,
    },
    {
        id: "2",
        text: `${t("PRODUCTS")}`,
        link: `/deals/products`,
        icon: `${Icon2}`,
    },
    {
        id: "3",
        text: `${t("SERVICES")}`,
        link: `/deals/services`,
        icon: `${Icon3}`,
    },
    {
        id: "4",
        text: `${t("BRANDS")} `,
        link: `/deals/brands`,
        icon: `${Icon4}`,
    },
    {
        id: "5",
        text: `${t("COMPANIES")} `,
        link: `/deals/companies`,
        icon: `${Icon5}`,
    },
];

export default dealsData;




