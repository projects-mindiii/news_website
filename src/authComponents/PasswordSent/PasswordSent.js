import { Button, Container } from "react-bootstrap";
import "./PasswordSent.css";
import Email from "../../assets/images/email_verification.png";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

function PasswordSent() {

    //set language
    const { t, i18n } = useTranslation();

    return (
        <div className="main">
            <Container>
                <div className="signupForm">
                    <div className="forgotPassword">
                        <img src={Email} alt="reset-password" />
                        <h1>{t("NEW_PASS")}</h1>
                        <p>{t("PASS_SENT")}</p>
                        <span>{t("SENT_EMAIL")}</span>

                        <Button className="btn" type="submit">
                            {t("LOGIN")}
                        </Button>
                        <h4>{t("RESEND")}</h4>
                        <h4>{t("CHANGE_EMAIL")}</h4>
                    </div>
                </div> 
            </Container>
        </div>
    );
}
export default PasswordSent;