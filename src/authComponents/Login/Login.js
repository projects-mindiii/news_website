import { Container } from "react-bootstrap";
import "./Login.css";
import Email from "../../assets/images/email_logo.png";
import Google from "../../assets/images/google_logo.png";
import Facebook from "../../assets/images/facebook_logo.png";
import Apple from "../../assets/images/apple_logo.png";
import Linkedin from "../../assets/images/linkdin_logo.png";
import { useNavigate } from "react-router-dom";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";

//--------Create a Login component----------
function Login() {
    const navigate = useNavigate();
     //set language
  const { t, i18n } = useTranslation();

    return (
        <div className="main">
            <Container>
                <div className="signupForm">
                    <div className="topHeading">
                        <h1>{t("LOGIN")}</h1>
                    </div>

                    <div className="loginComponents" onClick={() => navigate("/login-form")}>
                        <img src={Email} alt="email-logo" />
                        <h3>{t("LOGIN_EMAIL")}</h3>
                    </div>

                    <div className="loginComponents">
                        <img src={Google} alt="google-logo" />
                        <h3>{t("LOGIN_GOOGLE")}</h3>
                    </div>
                    <div className="loginComponents">
                        <img src={Facebook} alt="facebook-logo" />
                        <h3>{t("LOGIN_FACEBOOK")}</h3>
                    </div>
                    <div className="loginComponents">
                        <img src={Apple} alt="apple-logo" />
                        <h3>{t("LOGIN_APPLE")}</h3>
                    </div>
                    <div className="loginComponents">
                        <img src={Linkedin} alt="linkedin-logo" />
                        <h3>{t("LOGIN_LINKEDIN")}</h3>
                    </div>
                    <div className="accountType">
                        <p>{t("DONT_ACCOUNT")}<span onClick={() => navigate("/sign-up")}> {t("SIGNUP")} </span></p>
                    </div>
                </div>

            </Container>
        </div>
    );
}
export default Login;  
