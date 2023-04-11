import { Container } from "react-bootstrap";
import "./Login.css";
import Email from "../../assets/images/email_logo.png";
import Google from "../../assets/images/google_logo.png";
import Facebook from "../../assets/images/facebook_logo.png";
import Apple from "../../assets/images/apple_logo.png";
import Linkedin from "../../assets/images/linkdin_logo.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import React from "react";
import FacebookLogin from "react-facebook-login";
import SublyApi from "../../helpers/Api";
import { Toast } from "../../utils/Toaster";

//--------Create a Login component----------
function Login() {
  const navigate = useNavigate();
  //set language
  const { t, i18n } = useTranslation();

  

  const responseFacebook = async (response) => {
    console.log("response", response);
    let userData = response;
    if (userData) {
      // Toast.dismiss();
      let requestData = new FormData();
      requestData.append("name", userData.name);
      requestData.append("social_type", 2);
      requestData.append("social_key", userData.id);
      requestData.append("email", userData.email);
      requestData.append("profile_url", "");
      await SublyApi.checkSocialLogin(requestData).then((responsejson) => {
        console.log("response", responsejson);
        if (responsejson.status_code === 200) {
          Toast.fire({
            icon: "success",
            title: responsejson.message,
          });
        } else if (responsejson.status === 400 || responsejson.status === 500) {
          Toast.error(responsejson.data.error.message, {
            autoClose: 1500,
          });
        }
      });
    }
  };

  //   const componentClicked = (data)=>{
  //     console.log(data)
  //   }

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
            <img src={Google} alt="google-logo" />
            <h3>{t("LOGIN_GOOGLE")}</h3>
          </div>
          <div className="loginComponents">
            <img src={Facebook} alt="facebook-logo" />
            <FacebookLogin
              appId="598360515537196"
              autoLoad={true}
              fields="name,email,picture"
              callback={responseFacebook}
              cssClass="my-facebook-button-class"
            />

            {/* <h3>{t("LOGIN_FACEBOOK")}</h3> */}
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
