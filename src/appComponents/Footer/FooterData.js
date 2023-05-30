// /** @format */

import { t } from "i18next";
import Facebook from "../../assets/images/facebook_ico.png";
import Twitter from "../../assets/images/twitter_ico.png";
import Linkedin from "../../assets/images/linkdin_ico.png";
import Instragram from "../../assets/images/instagram_ico.png";
import Youtube from "../../assets/images/youtube_ico.png";
import Telegram from "../../assets/images/send_ico.png";
import AppStore from "../../assets/images/appStore.png";
import GooglePlay from "../../assets/images/googlePlay.png";
import AppGallery from "../../assets/images/appGallery.png";

export const footerData = {
    sociallogo: [
        {
            id: "1",
            logo: `${Facebook}`,
            link: process.env.REACT_APP_FACEBOOK_KEY,
        },
        {
            id: "2",
            logo: `${Twitter}`,
            link: process.env.REACT_APP_TWITTER_KEY,
        },
        {
            id: "3",
            logo: `${Linkedin}`,
            link: process.env.REACT_APP_LINKEDIN_KEY,
        },
        {
            id: "4",
            logo: `${Instragram}`,
            link: process.env.REACT_APP_INSTRAGRAM_KEY,
        },
        {
            id: "5",
            logo: `${Youtube}`,
            link: process.env.REACT_APP_YOUTUBE_KEY,
        },
        {
            id: "6",
            logo: `${Telegram}`,
            link: process.env.REACT_APP_TELEGRAM_KEY,
        },
    ],
    socialapp: [
        {
            id: "1",
            socialapp: `${AppStore}`,
        },
        {
            id: "2",
            socialapp: `${GooglePlay}`,
        },
        {
            id: "3",
            socialapp: `${AppGallery}`,
        },
    ],
    links: [
        // {
        //     id: "1",
        //     text: `${t("NEWS_LINKS")}`,
        //     link: `/`,
        // },
        {
            id: "2",
            text: `${t("JOB_LINKS")}`,
            link: `/job-types`,
        },
        {
            id: "3",
            text: `${t("ADVERTIES_LINKS")}`,
            link: `/your-add`,
        },
        {
            id: "4",
            text: `${t("DEALS_LINKS")}`,
            link: `/deals/latest-deals`,
        },
        {
            id: "5",
            text: `${t("CLASSIFIEDS_LINKS")}`,
            link: `/classifieds`,
        },
        {
            id: "6",
            text: `${t("POST_ADVERT_LINKS")}`,
            link: `/post-advert`,
        },
        {
            id: "7",
            text: `${t("YOUR_ADS_LINKS")}`,
            link: `/your-add`,
        },
        {
            id: "8",
            text: `${t("LATEST_DEALS_LINKS")}`,
            link: `/deals/latest-deals`,
        },
        {
            id: "9",
            text: `${t("PRODUCTS_LINKS")}`,
            link: `/deals/products`,
        },
        {
            id: "10",
            text: `${t("SERVICES_LINKS")}`,
            link: `/deals/services`,
        },
        {
            id: "11",
            text: `${t("BRANDS_LINKS")}`,
            link: `/deals/brands`,
        },
        {
            id: "12",
            text: `${t("COMPANIES_LINKS")}`,
            link: `/deals/companies`,
        },
        {
            id: "13",
            text: `${t("BOOKMARKS_LINKS")}`,
            link: `/book-marks`,
        },
        {
            id: "14",
            text: `${t("PROFILE_LINKS")}`,
            link: `/view-profile`,
        },
    ],
};


