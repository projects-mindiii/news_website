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
        {
            id: "1",
            text: `${t("NEWS_LINKS")}`,
        },
        {
            id: "2",
            text: `${t("JOB_LINKS")}`,
        },
        {
            id: "3",
            text: `${t("ADVERTIES_LINKS")}`,
        },
        {
            id: "4",
            text: `${t("DEALS_LINKS")}`,
        },
        {
            id: "5",
            text: `${t("CLASSIFIEDS_LINKS")}`,
        },
        {
            id: "6",
            text: `${t("POST_ADVERT_LINKS")}`,
        },
        {
            id: "7",
            text: `${t("YOUR_ADS_LINKS")}`,
        },
        {
            id: "8",
            text: `${t("LATEST_DEALS_LINKS")}`,
        },
        {
            id: "9",
            text: `${t("PRODUCTS_LINKS")}`,
        },
        {
            id: "10",
            text: `${t("SERVICES_LINKS")}`,
        },
        {
            id: "11",
            text: `${t("BRANDS_LINKS")}`,
        },
        {
            id: "12",
            text: `${t("COMPANIES_LINKS")}`,
        },
        {
            id: "13",
            text: `${t("BOOKMARKS_LINKS")}`,
        },
        {
            id: "14",
            text: `${t("PROFILE_LINKS")}`,
        },
    ],
};


