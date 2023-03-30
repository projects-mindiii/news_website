import { useNavigate } from "react-router-dom";
import "./HeaderFeatures.css";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";


function HeaderFeatures() {
    const navigate = useNavigate();
    //set language
    const { t, i18n } = useTranslation();
    
    return (
        <>
            <div className="headerFeature" >
                <h5 onClick={() => navigate("/sign-up")}>{t("CREATE_PROFILE")}</h5>
                <span>|</span>
                <h5 onClick={() => navigate("/login")}>{t("LOG_IN")}</h5>
            </div>


            {/* <div className="headerFeature" >
                    <h5>{statictext.BOOKMARKS}</h5>
                <span>|</span>
                    <h5>{statictext.VIEW_PROFILE}</h5>
                <span>|</span>
                    <h5>{statictext.LOG_OUT}</h5>
            </div> */}
        </>
    );
}
export default HeaderFeatures;