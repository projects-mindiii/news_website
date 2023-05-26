import { guestUserLogin, userLogout } from "../../store/slices/UserSlice";
import { Toast } from "../../utils/Toaster";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { STATUS_CODES } from "../../utils/StatusCode";
function SendResponse(responsejson) {  
    const navigate = useNavigate();
    const dispatch = useDispatch();
    navigate("/login");
    const { t } = useTranslation();

    if (responsejson.status_code == STATUS_CODES.SUCCESS) {
        Toast.fire({
            icon: "success",
            title: responsejson.message,
        });
        navigate("/your-add");
    } else {
        if (responsejson.status_code === STATUS_CODES.INVALID_TOKEN) {
            Toast.fire({
                icon: "error",
                title: t("SESSION_EXPIRE"),
            });
            dispatch(userLogout(userToken));
            dispatch(guestUserLogin());
            navigate("/login");
        } else {
            Toast.fire({
                icon: "error",
                title: responsejson.message,
            });
        }
    }

    return (
        <></>
    );
}

export default SendResponse;