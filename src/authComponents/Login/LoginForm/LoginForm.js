import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "./LoginForm.css";
import "../../../assets/styles/Common.css";
import Google from "../../../assets/images/google_logo.png";
import Facebook from "../../../assets/images/facebook_logo.png";
import Apple from "../../../assets/images/apple_logo.png";
import Linkedin from "../../../assets/images/linkdin_logo.png";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n";



function LoginForm() {
    const [shown, setShown] = useState(false);
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
    }

    return (
        <div className="main">
            <Container>
                <div className="signupForm">
                    <div className="topHeading">
                        <h1>{t("EMAIL_LOGIN")}</h1>
                    </div>
                    <Form onSubmit={handleSubmit(onsubmit)}>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
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
                                        value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: `${t("INVALID_EMAIL")}`,
                                    },
                                })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3 passwordinput">
                            <Form.Control
                                type={shown ? "text" : "password"}
                                placeholder={t("PASSWORD")}
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message:  `${t("INCOMPLETE")}`,
                                    },
                                    pattern: {
                                        value: /^\S*$/,
                                        message: `${t("INVALID_PASSWORD")}`,
                                    },
                                    maxLength: {
                                        value: 15,
                                        message:`${t("PASS_MAXLENGTH")}`,
                                    },
                                    minLength: {
                                        value: 8,
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

                        <div className="forgotCls">
                            <Form.Group className="mb-3 customCheck" controlId="formBasicRadio">
                                <Form.Check type="checkbox" label={t("REMEMBER_ME")}defaultChecked />
                            </Form.Group>

                            <h6>{t("FORGOT_PASSWORD")}</h6>
                        </div>

                        <div className="errorSet">
                            <span className="errorShow">
                                {errors[Object.keys(errors)[0]] &&
                                    errors[Object.keys(errors)[0]].message}{" "}
                            </span>
                        </div>

                        <Button className="btn" type="submit">
                            LOGIN
                        </Button>

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