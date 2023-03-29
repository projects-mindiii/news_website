import { Button, Container, Form } from "react-bootstrap";
import "./EmailVarify.css";
import EMAILVARIFICATION from "../../assets/images/emailvarify.png";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { useForm } from "react-hook-form";
// import OtpInput from "react-otp-input";
import { useState } from "react";

function EmailVarify() {
  const [emailOtp, setEmailOtp] = useState("");
  //set language
  const { t, i18n } = useTranslation();

  //----------function for form validation using useform------------
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //-----------function for submit login form-----------
  const onsubmit = (data) => {
    console.log(data);
  };

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
            <p>{t("VARIFICATION_TEXT")}</p>

            <Form onSubmit={handleSubmit(onsubmit)}>
              {/* <div className="otpbox">
                                            <OtpInput
                                                className="inputCus"
                                                value={emailOtp}
                                                isInputNum={true}
                                                 onChange={(value) => {
                                                     setEmailOtp(value);
                                                }}
                                                 numInputs={4}
                                                 isInputSecure={true}
                                            />
                                        </div>  */}

              <span className="errorShow">
                {errors[Object.keys(errors)[0]] &&
                  errors[Object.keys(errors)[0]].message}{" "}
              </span>

              <Button className="btn" type="submit">
                {t("VERIFY")}
              </Button>
              <div className="bottomText">
                <span
                // onClick={() => { setEmailOtp(""); SendEmailOtp(); }}
                >
                  Resend OTP
                </span>
              </div>

              <div className="bottomText">
                <span
                // onClick={() => { setEmailOtp(""); SendEmailOtp(); }}
                >
                  change email address
                </span>
              </div>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
}
export default EmailVarify;
