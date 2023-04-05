import { useState } from "react";
import "./SignupForm.css";
import "../../assets/styles/Common.css";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import { BsToggleOn, BsToggleOff } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SublyApi from "../../helpers/Api";
import { Toast } from "../../utils/Toaster";
import { EmailValidation } from "../../utils/CommonInputFields/EmailValidation";



//--------------Form for singing up new users----------
function SignupForm() {
  const location = useLocation();
  const navigate = useNavigate();
  //set language
  const {t} = useTranslation();
  const signupDetails = location.state;

  console.log("signupDetails", signupDetails)

  //-------sets toggle for showing and hiding password------
  const [shown, setShown] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);
  //-------sets toggle for subscribe button on/off--------------
  // const [notification, setNotification] = useState(false);


  //--------function for form validation using useform-----------
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
    },
  });


  const onSubmit = async (formdata) => {
    let requestData = new FormData();
    requestData.append("name", formdata.fullName);
    requestData.append("email", formdata.email);
    requestData.append("password", formdata.password);
    requestData.append("confirm_password", formdata.confirmPassword);
    await SublyApi.requestOtp(requestData).then((responsejson) => {
      if (responsejson.status_code === 200) {
        navigate("/email-varify",{state:{name:formdata.fullName,
           email:formdata.email,
            password:formdata.password,
             confirm_password:formdata.confirmPassword,
              otp:formdata.otp,
               country:formdata.country,
                initial_lat:formdata.initial_lat,
                 initial_long:formdata.initial_long}})
        setValue("fullName", "");
        setValue("email", "");
        setValue("password", "");
        setValue("confirmPassword", "");
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
  };

  return (
    <div className="main">
      <Container>
        <div className="signupForm">
          <div className="topHeading">
            <h1>{t("CREATEACCOUNT")}</h1>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Control
                type="text"
                placeholder={t("NAME")}
                {...register("fullName", {
                  required: {
                    value: true,
                    message: `${t("INCOMPLETE")}`,
                  },
                  minLength: {
                    value: 2,
                    message: `${t("NAME_MINLENGTH")}`,
                  },
                  maxLength: {
                    value: 20,
                    message: `${t("NAME_MAXLENGTH")}`,
                  },
                  pattern: {
                    value: /^(?![\s.]+$)[a-zA-Z\s.]*$/,
                    message: `${t("INVALID_NAME")}`,
                  },
                })}
               
              />
            </Form.Group>

            <Form.Group className="mb-3">
              {/* <Form.Control
                type="email"
                placeholder={t("EMAIL")}
                {...register("email", { 
                  required: {
                    value: true,
                    message: `${t("INCOMPLETE")}`,
                  },
                  maxLength: {
                    value: 50,
                    message: `${t("EMAIL_MAXLENGTH")}`,
                  },
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: `${t("INVALID_EMAIL")}`,
                  },
                })}
              /> */}

              <Form.Control
                placeholder={t("EMAIL")}
                {...register("email", EmailValidation)}
               
              />
            </Form.Group>

            <Form.Group className="mb-3 passwordinput">
              <Form.Control
                type={shown ? "text" : "password"}
                placeholder={t("PASSWORD")}
                {...register("password", {
                  required: {
                    value: true,
                    message: `${t("INCOMPLETE")}`,
                  },
                  pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
                    message: `${t("INVALID_PASSWORD")}`,
                  },
                  maxLength: {
                    value: 15,
                    message: `${t("PASS_MAXLENGTH")}`,
                  },
                  minLength: {
                    value: 6,
                    message: `${t("PASS_MINLENGTH")}`,
                  },
                })}
               
                
              />
              <div className="passwordicon">
                {shown ? (
                  <FaEye className="icon" onClick={() => setShown(!shown)} />
                ) : (
                  <FaEyeSlash
                    className="icon"
                    onClick={() => setShown(!shown)}
                  />
                )}
              </div>
            </Form.Group>

            <Form.Group className="mb-3 passwordinput">
              <Form.Control
                type={passwordShow ? "text" : "password"}
                placeholder={t("CONFIRM_PASSWORD")}
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: `${t("INCOMPLETE")}`,
                  },
                 
                  validate: (value) =>
                    value === watch("password") || "Passwords have to match",
                })}
               
              />
              <div className="passwordicon">
                {passwordShow ? (
                  <FaEye
                    className="icon"
                    onClick={() => setPasswordShow(!passwordShow)}
                  />
                ) : (
                  <FaEyeSlash
                    className="icon"
                    onClick={() => setPasswordShow(!passwordShow)}
                  />
                )}
              </div>
            </Form.Group>

            {/* <div className="notification">
              {notification ? (
                <BsToggleOn
                  className="icon"
                  onClick={() => setNotification(!notification)}
                />
              ) : (
                <BsToggleOff
                  className="icon"
                  onClick={() => setNotification(!notification)}
                />
              )}
              <p>{t("SUBSCRIPTION_TEXT")}</p>
            </div> */}

            <div className="errorSet">
              <span className="errorShow">
                {errors[Object.keys(errors)[0]] &&
                  errors[Object.keys(errors)[0]].message}{" "}
              </span>
            </div>

            <Button className="btn" type="submit" >
            {t("CREATEACCOUNT")}
            </Button>
            <div className="accountType">
              <p>
                {t("EXISTING_ACCOUNT")}
                <span onClick={() => navigate("/Login")}>{t("LOGIN_IN")}</span>
              </p>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default SignupForm;
