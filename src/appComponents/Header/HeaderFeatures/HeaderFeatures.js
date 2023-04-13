import { useNavigate } from "react-router-dom";
import "./HeaderFeatures.css";
import { useTranslation } from "react-i18next";


function HeaderFeatures() {
    const navigate = useNavigate();
    //set language
    const { t } = useTranslation();

    return (
        <>
            <div className="headerFeature" >
                <h5 onClick={() => navigate("/sign-up")}>{t("CREATE_PROFILE")}</h5>
                <span>|</span>
                <h5 onClick={() => navigate("/login")}>{t("LOG_IN")}</h5>
            </div>


            {/* <div className="headerFeature" >
                <h5>{t("BOOKMARKS")}</h5>
                <span>|</span>
                <h5>{t("VIEW_PROFILE")}</h5>
                <span>|</span>
                <h5>{t("LOG_OUT")}</h5>
            </div> */}
        </>
    );
}
export default HeaderFeatures;