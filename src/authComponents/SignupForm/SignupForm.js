import { useEffect, useState} from "react";
import "./SignupForm.css";
import "../../assets/styles/Common.css";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
// import { BsToggleOn, BsToggleOff } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SublyApi from "../../helpers/Api";
import { Toast } from "../../utils/Toaster";
import ErrorResponse from "../../utils/AlertBox/ErrorResponse";
import EmailInput from "../../formComponent/EmailInput/EmailInput";
import PasswordInput from "../../formComponent/PasswordInput/PasswordInput";
import NameInput from "../../formComponent/NameInput.js/NameInput";
import CustomBtn from "../../formComponent/Button/Button";
import ConfirmPassInput from "../../formComponent/ConfirmPassInput/ConfirmPassInput";
import { STATUS_CODES } from "../../utils/StatusCode";
import Loader from "../../utils/Loader/Loader";
import { useSelector } from "react-redux";



//--------------Form for singing up new users----------
function SignupForm() {
  const { userToken ,isLoading} = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  //set language
  const { t } = useTranslation();
  const signupDetails = location.state;
  //----- set state for show alert box for error response------
  const [showError, setShowError] = useState(null);

  //--------function for form validation using useform-----------
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  // ====Form submition handling and calling api====
  const onSubmit = async (formdata) => {
    let requestData = new FormData();
    requestData.append("name", formdata.fullName);
    requestData.append("email", formdata.email);
    requestData.append("password", formdata.password);
    requestData.append("confirm_password", formdata.confirmPassword);
    await SublyApi.requestOtp(requestData).then((responsejson) => {
      if (responsejson.status_code === STATUS_CODES.SUCCESS) {
        navigate("/email-varify", {
          state: {
            name: formdata.fullName,
            email: formdata.email,
            password: formdata.password,
            confirm_password: formdata.confirmPassword,
            otp: formdata.otp,
            country: formdata.country,
            initial_lat: formdata.initial_lat,
            initial_long: formdata.initial_long,
          },
        });
        setValue("fullName", "");
        setValue("email", "");
        setValue("password", "");
        setValue("confirmPassword", "");
        Toast.fire({
          icon: "success",
          title: responsejson.message,
        });
      } else {
        setShowError(responsejson.data.message);
      }
    });
  };

  // ====Here set values for perticuler fields====
  useEffect(() => {
    if (signupDetails && signupDetails.isChangeEmail == true) {
      setValue("fullName", signupDetails.name);
      setValue("email", signupDetails.email);
      setValue("password", signupDetails.password);
      setValue("confirmPassword", signupDetails.confirm_password);
    }
  }, []);

  return (
    <div className="main">
      {isLoading === true ? (
                <Loader />
            ) : ""}
      <Container>
        <div className="signupForm">
          <div className="topHeading">
            {showError ? (
              <ErrorResponse message={showError} setShowError={setShowError} />
            ) : (
              ""
            )}
            <h1>{t("CREATEACCOUNT")}</h1>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <NameInput register={register} />
            <EmailInput register={register}/>
            <PasswordInput register={register}/>
            <ConfirmPassInput register={register}watch={watch}/>
            <div className="errorSet">
              <span className="errorShow">
                {errors[Object.keys(errors)[0]] &&
                  errors[Object.keys(errors)[0]].message}{" "}
              </span>
            </div>
            <CustomBtn>{t("CREATEACCOUNT")}</CustomBtn>
            <div className="accountType">
              <p>
                {t("EXISTING_ACCOUNT")}
                <span onClick={() => navigate("/login")}>  {t("LOGIN_IN")}</span>
              </p>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default SignupForm;
