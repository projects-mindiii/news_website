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


function LoginForm() {
    const [shown, setShown] = useState(false);

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
                        <h1>EMAIL LOGIN</h1>
                    </div>
                    <Form onSubmit={handleSubmit(onsubmit)}>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Your Email"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: "Form incomplete, please fill all fields",
                                    },
                                    maxLength: {
                                        value: 50,
                                        message: "Email must be 50 character or small",
                                    },
                                    pattern: {
                                        value:
                                            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: "Invalid Email Address",
                                    },
                                })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3 passwordinput">
                            <Form.Control
                                type={shown ? "text" : "password"}
                                placeholder="Your Password"
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: "Form incomplete, please fill all fields",
                                        minLength: 6,
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                            message: "Invalid Password",
                                        },
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
                            <Form.Group className="mb-3 customRadio" controlId="formBasicRadio">
                                <Form.Check type="radio" label="Remember me" defaultChecked />
                            </Form.Group>

                            <h6>Forgot password ?</h6>
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
                            <span>__________</span> <p>or login with</p><span>__________</span>
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