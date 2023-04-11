import { Container } from "react-bootstrap";
import "./PasswordSent.css";
import Email from "../../assets/images/email_verification.png";
import { useTranslation } from "react-i18next";
import CustomBtn from "../../formComponent/Button/Button";
import { useNavigate, useLocation } from "react-router-dom";
import SublyApi from "../../helpers/Api";
import { Toast } from "../../utils/Toaster";
import { useState } from "react";
import ErrorResponse from "../../utils/AlertBox/ErrorResponse";

//----------create a password sent component------------
function PasswordSent() {
    const navigate = useNavigate();
    const location = useLocation();
    const detail = location.state;

    //set language
    const { t } = useTranslation();
    //-----state for show alert box for error response------
    const [showError, setShowError] = useState(null);

    //-----------function for forgot password (resen api) api call-----------
    async function forgotData() {
        let requestData = new FormData();
        requestData.append("email", detail.email);
        await SublyApi.forgotPassword(requestData).then((responsejson) => {
            if (responsejson.status_code === 200) {
                Toast.fire({
                    icon: "success",
                    title: responsejson.message,
                });
                navigate("/password-sent", {
                    state:
                    {
                        email: detail.email,
                    }
                })
            } else {
                setShowError(responsejson.data.message)
            }
        })
    }

    return (
        <div className="main">
            <Container>
                <div className="signupForm">
                    {showError ?
                        <ErrorResponse message={showError} setShowError={setShowError} /> : ""}
                    <div className="forgotPassword">
                        <img src={Email} alt="reset-password" />
                        <h1>{t("NEW_PASS")}</h1>
                        <div className="passwordSent">
                            <p>{t("PASS_SENT")}</p>
                            <span>{detail.email}</span>
                        </div>

                        {/* <Button className="btn" type="submit" onClick={() => navigate("/login-form")}>
                            {t("LOGIN")}
                        </Button> */}
                        <CustomBtn onClick={() => navigate("/login-form")}>{t("LOGIN")}</CustomBtn>

                        <h4 onClick={() => { forgotData(); }}>
                            {t("RESEND")}
                        </h4>
                        <h4 onClick={() => navigate("/forgot-password")}>{t("CHANGE_EMAIL")}</h4>
                    </div>
                </div>
            </Container>
        </div>
    );

}
export default PasswordSent;