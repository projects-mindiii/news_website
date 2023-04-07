import { Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "./LoginForm.css";
import "../../../assets/styles/Common.css";
import Google from "../../../assets/images/google_logo.png";
import Facebook from "../../../assets/images/facebook_logo.png";
import Apple from "../../../assets/images/apple_logo.png";
import Linkedin from "../../../assets/images/linkdin_logo.png";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";
import { useNavigate } from "react-router-dom";
import SublyApi from "../../../helpers/Api";
import { Toast } from "../../../utils/Toaster";
import EmailInput from "../../../formComponent/EmailInput/EmailInput";
import PasswordInput from "../../../formComponent/PasswordInput/PasswordInput";
import CustomBtn from "../../../formComponent/Button/Button";


//--------Create a Login with email component----------
function LoginForm() {
    const navigate = useNavigate();

    //set language
    const { t, i18n } = useTranslation();

    //----------function for form validation using useform------------
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();


    //-----------function for submit login form-----------
    const onSubmit = async (formdata) => {
        let requestData = new FormData();
        requestData.append("email", formdata.email);
        requestData.append("password", formdata.password);
        await SublyApi.loginProcess(requestData).then((responsejson) => {
            if (responsejson.status_code === 200) {
                setValue("email", "");
                setValue("password", "");
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
        })

    };

    return (
        <div className="main">
            <Container>
                <div className="signupForm">
                    <div className="topHeading">
                        <h1>{t("EMAIL_LOGIN")}</h1>
                    </div>
                    <Form onSubmit={handleSubmit(onSubmit)}>

                        <EmailInput register={register} />

                        <PasswordInput register={register} />

                        <div className="forgotCls">
                            <Form.Group className="mb-3 customCheck" controlId="formBasicRadio">
                                <Form.Check type="checkbox" label={t("REMEMBER_ME")} defaultChecked />
                            </Form.Group>

                            <h6 onClick={() => navigate("/forgot-password")}>{t("FORGOT_PASSWORD")}</h6>
                        </div>

                        <div className="errorSet">
                            <span className="errorShow">
                                {errors[Object.keys(errors)[0]] &&
                                    errors[Object.keys(errors)[0]].message}{" "}
                            </span>
                        </div>

                        {/* <Button className="btn" type="submit">
                            {t("LOGIN")}
                        </Button> */}
                        <CustomBtn>{t("LOGIN")}</CustomBtn>

                        <div className="LoginText">
                            <span></span> <p>{t("LOGIN_WITH")}</p><span></span>
                        </div>

                        <div className="socialLogo">
                            <img src={Google} alt="google-logo" />
                            <img src={Facebook} alt="facebook-logo" />
                            <img src={Apple} alt="apple-logo" />
                            <img src={Linkedin} alt="linkedin-logo" />
                        </div>
                    </Form>
                </div>
            </Container>
        </div>
    );
}
export default LoginForm;