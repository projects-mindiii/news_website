import { Button, Container, Form } from "react-bootstrap";
import "./EmailVarify.css";
import EMAILVARIFICATION from "../../assets/images/emailvarify.png";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import OtpInput from "react-otp-input";
import { useState } from "react";

function EmailVarify() {
  const [otp, setOtp] = useState("");
  //set language
  const { t, i18n } = useTranslation();

  // async function SendEmailOtp() {
  //     let requestData = new FormData();
  //     requestData.append("name", formdata.fullName);
  //     requestData.append("email", formdata.email);
  //     requestData.append("password", formdata.password);
  //     requestData.append("confirm_password", formdata.confirmPassword);
  //             await SublyApi.varifyOtp(requestData).then((responsejson) => {
  //                 if (responsejson.status == "success") {
  //                     alert(responsejson.data.otp);
  //                     setSignUpOtp(responsejson.data.otp);
  //                     numberShow();
  //                     Toast.fire({
  //                         icon: "success",
  //                         title: responsejson.message,
  //                     });
  //                 } else {
  //                     Toast.fire({
  //                         icon: "error",
  //                         title: responsejson.data.message,
  //                     });
  //                 }
  //             });

  // }
  return (
    <div className="main">
      <Container>
        <div className="signupForm">
          <div className="forgotPassword">
            <img src={EMAILVARIFICATION} alt="reset-password" />
            <h1>{t("EMAIL_VERIFICATION")}</h1>
            <div className="passwordSent">
              <p>{t("VARIFICATION_TEXT")}</p>
              <span>{t("SENT_EMAIL")}</span>
            </div>
            <div className="otpbox">
              <OtpInput
                className="inputCus"
                inputStyle="inputStyle"
                value={otp}
                onChange={(value) => {
                  setOtp(value);
                }}
                numInputs={4}
                isInputSecure={true}
                renderInput={(props) => <input {...props} />}
              />
            </div>
            <Button className="btn" type="submit">
              {t("VARIFY")}
            </Button>
            <h4>{t("RESEND")}</h4>
            <h4>{t("CHANGE_EMAIL")}</h4>
          </div>
        </div>
      </Container>
    </div>
  );
}
export default EmailVarify;
