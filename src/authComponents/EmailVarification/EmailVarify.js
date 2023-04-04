import { Button, Container } from "react-bootstrap";
import "./EmailVarify.css";
import EMAILVARIFICATION from "../../assets/images/emailvarify.png";
import { useTranslation } from "react-i18next";
import OtpInput from "react-otp-input";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SublyApi from "../../helpers/Api";
import { Toast } from "../../utils/Toaster";


function EmailVarify() {
  const location = useLocation();
  const navigate = useNavigate();
  const [emailOtp, setEmailOtp] = useState("");
  //set language
  const { t } = useTranslation();
  const detail = location.state;
  console.log("detailssssss",detail);




  async function SendEmailOtp() {
    let requestData = new FormData();
    requestData.append("name", detail.name);
    requestData.append("email", detail.email);
    requestData.append("password", detail.password);
    requestData.append("confirm_password", detail.confirm_password);
    requestData.append("otp", emailOtp);
    // requestData.append("country", detail.country);
    // requestData.append("initial_lat", detail.initial_lat);
    // requestData.append("initial_long", detail.initial_long);

    await SublyApi.varifyOtp(requestData).then((responsejson) => {
      if (responsejson.status === "success") {
        setEmailOtp(responsejson.data.otp);
        Toast.fire({
          icon: "success",
          title: responsejson.message,
        });
        navigate("/login-form")
      } else {
        Toast.fire({
          icon: "error",
          title: responsejson.data.message,
        });
      }
    });
  }

  async function VarifyOtp(){
    let requestData = new FormData();
    requestData.append("name", detail.fullName);
    requestData.append("email", detail.email);
    requestData.append("password", detail.password);
    requestData.append("confirm_password", detail.confirm_password);
    await SublyApi.requestOtp(requestData).then((responsejson) => {
      if (responsejson.status_code === 200) {
        Toast.fire({
          icon: "success",
          title: responsejson.message,
        });
       
        console.log("responsejson", responsejson);
      } else {
        Toast.fire({
          icon: "error",
          title: responsejson.data.message,
        });
      }
    });
  };

  return (
    <div className="main">
      <Container>
        <div className="signupForm">
          <div className="forgotPassword">
            <img src={EMAILVARIFICATION} alt="reset-password" />
            <h1>{t("EMAIL_VERIFICATION")}</h1>
            <div className="passwordSent">
              <p>{t("VARIFICATION_TEXT")}</p>
              <span>{detail.email}</span>
            </div>
            <div className="otpbox">
              <OtpInput 
                className="inputCus"
                inputType="number"
                inputMode="numeric"
                  pattern="[0-9]*"
                inputStyle="inputStyle"
                isInputNum={true}
                copyNumbersOnly={true}
                value={emailOtp}
                onChange={(value) => {
                  setEmailOtp(value);
                }}
                numInputs={4}
                 isInputSecure={true}
                renderInput={(props) => <input {...props} />}
                
              />
            </div>
            <Button
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
            </Button>
            <h4  onClick={() => {VarifyOtp();}}>
              {t("RESEND")}
              <span
             
              ></span>
            </h4>
            <h4 onClick={() => navigate("/sign-up")}>
            {t("CHANGE_EMAIL")}</h4>
          </div>
        </div>
      </Container>
    </div>
  );
}
export default EmailVarify;
