import { Container } from "react-bootstrap";
import "./Login.css";
import Email from "../../assets/images/email_logo.png";
import Apple from "../../assets/images/apple_logo.png";
import Linkedin from "../../assets/images/linkdin_logo.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import GoogleLogin from "../CommonSocial/GoogleLogin";
import FacebookSocialLogin from "../CommonSocial/FacebookSocialLogin";

//--------Create a Login component----------
function Login() {
  const navigate = useNavigate();

  //set language
  const { t } = useTranslation();

  return (
    <div className="main">
      <Container>
        <div className="signupForm">
          <div className="topHeading">
            <h1>{t("LOGIN")}</h1>
          </div>
          <div
            className="loginComponents"
            onClick={() => navigate("/login-form")}
          >
            <img src={Email} alt="email-logo" />
            <h3>{t("LOGIN_EMAIL")}</h3>
          </div>

          <div className="loginComponents">
            <GoogleLogin googleText={t("LOGIN_GOOGLE")} />
          </div>
          <div className="loginComponents">
            <FacebookSocialLogin facebookText={t("LOGIN_FACEBOOK")} />
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
            <p>
              {t("DONT_ACCOUNT")}
              <span onClick={() => navigate("/sign-up")}> {t("SIGNUP")} </span>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
export default Login;
