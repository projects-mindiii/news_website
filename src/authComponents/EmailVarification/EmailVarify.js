import {Container } from "react-bootstrap";
import "./EmailVarify.css";
import EMAILVARIFICATION from "../../assets/images/emailvarify.png";
import { useTranslation } from "react-i18next";
import OtpInput from "react-otp-input";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SublyApi from "../../helpers/Api";
import { Toast } from "../../utils/Toaster";
import ErrorResponse from "../../utils/AlertBox/ErrorResponse";
import CustomBtn from "../../formComponent/Button/Button";
import { STATUS_CODES } from "../../utils/StatusCode";
import { useSelector } from "react-redux";
import Loader from "../../utils/Loader/Loader";

function EmailVarify() {
  const { userToken ,isLoading} = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const [emailOtp, setEmailOtp] = useState("");
  //set language
  const { t } = useTranslation();
  const detail = location.state;

  //----- set state for show alert box for error response------
  const [showError, setShowError] = useState(null);

  // ====calling api for sending verification otp to email====
  async function SendEmailOtp() {
    let requestData = new FormData();
    requestData.append("name", detail.name);
    requestData.append("email", detail.email);
    requestData.append("password", detail.password);
    requestData.append("confirm_password", detail.confirm_password);
    requestData.append("otp", emailOtp);
    await SublyApi.varifyOtp(requestData).then((responsejson) => {
      if (responsejson.status === "success") {
        setEmailOtp(responsejson.data.otp);
        setEmailOtp("");
        Toast.fire({
          icon: "success",
          title: responsejson.message,
        });
        navigate("/login-form");
      } else {
        setShowError(responsejson.data.message);
      }
    });
  }

  // ====handling verify otp api and response====
  async function VarifyOtp() {
    let requestData = new FormData();
    requestData.append("name", detail.fullName);
    requestData.append("email", detail.email);
    requestData.append("password", detail.password);
    requestData.append("confirm_password", detail.confirm_password);
    await SublyApi.requestOtp(requestData).then((responsejson) => {
      if (responsejson.status_code === STATUS_CODES.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: responsejson.message,
        });
      } else {
        Toast.fire({
          icon: "error",
          title: responsejson.data.message,
        });
      }
    });
  }

  return (
    <div className="main">
       {isLoading === true ? (
                <Loader />
            ) : ""}
      <Container>
        <div className="signupForm">
          <div className="forgotPassword">
            {showError ? (
              <ErrorResponse message={showError} setShowError={setShowError} />
            ) : (
              ""
            )}
            <img src={EMAILVARIFICATION} alt="reset-password" />
            <h1>{t("EMAIL_VERIFICATION")}</h1>
            <div className="passwordSent">
              <p className="emailText">{t("VARIFICATION_TEXT")}</p>
              <span>{detail.email}</span>
            </div>
            <div className="otpbox">
              <OtpInput
                className="inputCus"
                inputStyle="inputStyle"
                isInputNum={true}
                value={emailOtp}
                onChange={(value) => {
                  let numbers = /^[0-9]+$/;
                  if (value.match(numbers) || value == "") {
                    setEmailOtp(value);
                  } else {
                    return false;
                  }
                }}
                numInputs={4}
                isInputSecure={true}
                renderInput={(props) => <input {...props} />}
              />
            </div>
            <CustomBtn
              className="btn"
              type="submit"
              onClick={() => {
                if (emailOtp.length < 4) {
                  Toast.fire({
                    icon: "error",
                    title: "Please enter valid verification code.",
                  });
                } else {
                  SendEmailOtp();
                }
              }}
            >
              {t("VARIFY")}
            </CustomBtn>
            <h4
              onClick={() => {
                VarifyOtp();
              }}
            >
              {t("RESEND")}
             
            </h4>
            <h4
              onClick={() =>
                navigate("/sign-up", {
                  state: {
                    name: detail.name,
                    email: detail.email,
                    password: detail.password,
                    confirm_password: detail.confirm_password,
                    isChangeEmail: true,
                  },
                })
              }
            >
              {t("CHANGE_EMAIL")}
            </h4>
          </div>
        </div>
      </Container>
    </div>
  );
}
export default EmailVarify;