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
import { useGoogleLogin } from "@react-oauth/google";
import SublyApi from "../../helpers/Api";
import { Toast } from "../../utils/Toaster";
import { STATUS_CODES } from "../../utils/StatusCode";
import { isSocialLogin,socialSignup } from "../../store/slices/UserSlice";
import { useDispatch } from 'react-redux';


//--------Create a Login component----------
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //set language
  const { t } = useTranslation();

  // Social Login with google
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => getUserDetail(tokenResponse),
  });
    async function getUserDetail(value) {
      await SublyApi.verifyGoogleLogin(value.access_token).then((response)=>{
      if (response.status_code === STATUS_CODES.SUCCESS) {
        responseGoogle(response.data)
      } else if (response.status_code === 400) {
        Toast.fire({
          icon: "error",
          title: response.data.message,
        });
      }
    })

    }

    // Social Login with Google
 const responseGoogle = async (response)=>{
    let userData = response;
    if (userData) {
      let requestData = new FormData();
      requestData.append("name", userData.name);
      requestData.append("social_type", 1);
      requestData.append("social_key", userData.sub);
      requestData.append("email", userData.email);
      requestData.append("profile_url", userData.picture);
      await dispatch(isSocialLogin(requestData)).then(
        async (responsejson) => {
          const response = responsejson.payload;
          if (response.status_code === STATUS_CODES.SUCCESS) {
                if (response.status_code === STATUS_CODES.SUCCESS) {
                    Toast.fire({
                        icon: "success",
                        title: response.message,
                    });
                    navigate("/deals/latest-deals");
                    localStorage.setItem("token", response.data.token)
                } else {
                  Toast.fire({
                    icon: "error",
                    title: response.data.message,
                  });
                }
          } else if (
            response.data.status_code == STATUS_CODES.PAGE_NOT_FOUND
          ) {
            await dispatch(socialSignup(requestData)).then((signresponsejson) => {
                console.log('api socialSignup responsejson',signresponsejson)
                const response = signresponsejson.payload;
                if (response.status_code === STATUS_CODES.SUCCESS) {
                    Toast.fire({
                        icon: "success",
                        title: response.message,
                    });
                    navigate("/deals/latest-deals");
                    localStorage.setItem("token", signresponsejson.data.token)
                } else {

                    Toast.fire({
                      icon: "error",
                      title: response.data.message,
                    });
                }
            });
          } else {
            Toast.fire({
              icon: "Error",
              title: responsejson.message,
            });
          }
        }
      );
    }
 }
  

  // Social Login with facebook.
  const responseFacebook = async (response) => {
    let userData = response;
    if (userData) {
      let requestData = new FormData();
      requestData.append("name", userData.name);
      requestData.append("social_type", 2);
      requestData.append("social_key", userData.id);
      requestData.append("email", userData.email);
      requestData.append("profile_url", "");
      await SublyApi.checkSocialLogin(requestData).then(
        async (responsejson) => {
          if (responsejson.status_code === STATUS_CODES.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: responsejson.message,
            });
            navigate("/deals/latest-deals");
          } else if (
            responsejson.data.status_code == STATUS_CODES.PAGE_NOT_FOUND
          ) {
            await SublyApi.socialSignup(requestData).then((responsejson) => {
              if (responsejson.status_code === STATUS_CODES.SUCCESS) {
                Toast.fire({
                  icon: "success",
                  title: responsejson.message,
                });
                navigate("/deals/latest-deals");
              }
            });
          } else {
            Toast.fire({
              icon: "Error",
              title: responsejson.message,
            });
          }
        }
      );
    }
  };

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

          <div className="loginComponents" onClick={() => login()}>
            <img src={Google} alt="google-logo" />
            <h3>{t("LOGIN_GOOGLE")}</h3>
          </div>

          <div className="loginComponents">
            <img src={Facebook} alt="facebook-logo" />
            <FacebookLogin
              appId={process.env.REACT_APP_FACEBOOK_APP_ID}
              autoLoad={false}
              fields="name,email,picture"
              callback={responseFacebook}
              cssClass="my-facebook-button-class"
              textButton={<h3>{t("LOGIN_FACEBOOK")}</h3>}
              onFailure={(value) => console.log(value)}
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
