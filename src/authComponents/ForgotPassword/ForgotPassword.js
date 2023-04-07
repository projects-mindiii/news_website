import { Container, Form } from "react-bootstrap";
import "./ForgotPassword.css";
import Reset from "../../assets/images/reset_password.png";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CustomBtn from "../../formComponent/Button/Button";
import SublyApi from "../../helpers/Api";
import { Toast } from "../../utils/Toaster";
import EmailInput from "../../formComponent/EmailInput/EmailInput";


//----------create a forgotPassword component------------
function ForgotPassword() {
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

    //-----------function for forgot password api call-----------
    const onSubmit = async (formdata) => {
        let requestData = new FormData();
        requestData.append("email", formdata.email);
        await SublyApi.forgotPassword(requestData).then((responsejson) => {
            if (responsejson.status_code === 200) {
                setValue("email", "");
                Toast.fire({
                    icon: "success",
                    title: responsejson.message,
                });
                navigate("/password-sent", {
                    state:
                    {
                        email: formdata.email,
                    }
                })
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
                    <div className="forgotPassword">
                        <img src={Reset} alt="reset-password" />
                        <h1>{t("RESET_PASSWORD")}</h1>
                        <p>{t("PASSWORD_TEXT")}</p>

                        <Form onSubmit={handleSubmit(onSubmit)}>

                            <EmailInput register={register} />

                            <span className="errorShow">
                                {errors[Object.keys(errors)[0]] &&
                                    errors[Object.keys(errors)[0]].message}{" "}
                            </span>

                            {/* <Button className="btn" type="submit">
                                {t("RESET_PASS")}
                            </Button> */}
                            <CustomBtn>{t("RESET_PASS")}</CustomBtn>

                        </Form>
                    </div>
                </div>
            </Container>
        </div>
    );
}
export default ForgotPassword;