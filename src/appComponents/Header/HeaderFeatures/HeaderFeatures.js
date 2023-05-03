import { useNavigate } from "react-router-dom";
import "./HeaderFeatures.css";
import { useTranslation } from "react-i18next";
import { useSelector,useDispatch } from "react-redux";
import { userLogout } from "../../../store/slices/UserSlice";


function HeaderFeatures() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //set language
    const { t } = useTranslation();

    const { currentUser, isLoading } = useSelector((state) => state.user);
       //-----------function for submit login form-----------
       const logout = async () => {
        
        dispatch(userLogout());

    };
    
    return (
        <>
            {Object.keys(currentUser).length!==0?
                (<div className="headerFeature headerAfterProfile" >
                    <h5 onClick={() => navigate("/book-marks")}>{t("BOOKMARKS")}</h5>
                    <span>|</span>
                    <h5 onClick={() => navigate("/view-profile")}>{t("VIEW_PROFILE")}</h5>
                    <span>|</span>
                    <h5 onClick={logout} >{t("LOG_OUT")}</h5>
                </div>) :

                (<div className="headerFeature" >
                    <h5 onClick={() => navigate("/sign-up")}>{t("CREATE_PROFILE")}</h5>
                    <span>|</span>
                    <h5 onClick={() => navigate("/login")}>{t("LOG_IN")}</h5>
                </div>)
            }
        </>
    );
}
export default HeaderFeatures;