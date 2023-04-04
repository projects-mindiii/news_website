import { Container } from "react-bootstrap";
import "./PasswordSent.css";
import Email from "../../assets/images/email_verification.png";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import CustomBtn from "../../formComponent/Button/Button";
import { useNavigate } from "react-router-dom";

function PasswordSent() {
    const navigate = useNavigate();
    //set language
    const { t, i18n } = useTranslation();

    return (
        <div className="main">
            <Container>
                <div className="signupForm">
                    <div className="forgotPassword">
                        <img src={Email} alt="reset-password" />
                        <h1>{t("NEW_PASS")}</h1>
                        <div className="passwordSent">
                            <p>{t("PASS_SENT")}</p>
                            <span>{t("SENT_EMAIL")}</span>
                        </div>

                        {/* <Button className="btn" type="submit">
                            {t("LOGIN")}
                        </Button> */}
                       <CustomBtn>{t("LOGIN")}</CustomBtn>
                        <h4>{t("RESEND")}</h4>
                        <h4 onClick={() => navigate("/forgot-password")}>{t("CHANGE_EMAIL")}</h4>
                    </div>
                </div>
            </Container>
        </div>
    );
}
export default PasswordSent;