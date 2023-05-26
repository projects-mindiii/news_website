import { useNavigate } from "react-router-dom";
import "./HeaderFeatures.css";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../../../store/slices/UserSlice";
import { Icon } from "@iconify/react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

function HeaderFeatures() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //set language
  const { t } = useTranslation();

  const { currentUser, isLoading } = useSelector((state) => state.user);
  //-----------function for submit login form-----------
  const logout = async () => {
    dispatch(userLogout(currentUser));
    navigate("/login");
  };

  return (
    <>
      {Object.keys(currentUser).length !== 0 ? (
        <div className="headerFeature headerAfterProfile">
          <h5 onClick={() => navigate("/book-marks")}>{t("BOOKMARKS")}</h5>
          <span>|</span>
          <h5 onClick={() => navigate("/view-profile")}>{t("VIEW_PROFILE")}</h5>
          <span>|</span>
          <h5 onClick={logout}>{t("LOG_OUT")}</h5>
        </div>
      ) : (
        <div className="headerFeature infoIcon">
          <h5 onClick={() => navigate("/sign-up")}>{t("CREATE_PROFILE")}</h5>
          <span>|</span>
          <h5 onClick={() => navigate("/login")}>{t("LOG_IN")}</h5>

          <Icon
            icon="ph:info-fill"
            color="#ec4624"
            width="25"
            height="25"
            data-tooltip-id="my-tooltip"
          />
        </div>
      )}
      <Tooltip
        id="my-tooltip"
        place="bottom"
        className="tooltipClass"
        style={{ zIndex: "999" }}
      >
        {t("TOOLTIP_TEXT")}
      </Tooltip>
    </>
  );
}
export default HeaderFeatures;