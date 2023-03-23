import { useState } from "react";
import "./SignupForm.css";
import "../../assets/styles/Common.css";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  error_message,
  statictext,
  placeholders,
} from "../../utils/CommonStaticText";

//--------------Form for singing up new users----------

function SignupForm() {
  const navigate = useNavigate();
  //-------sets toggle for showing and hiding password------
  const [shown, setShown] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);
  //-------sets toggle for subscribe button on/off--------------
  const [notification, setNotification] = useState(false);

  //--------function for form validation using useform-----------
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onsubmit = (data) => {
    console.log("data", data);
  };
  return (
    <div className="main">
      <Container>
        <div className="signupForm">
          <div className="topHeading">
            <h1>{statictext.CREATEACCOUNT}</h1>
          </div>
          <Form onSubmit={handleSubmit(onsubmit)}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Control
                type="text"
                placeholder={placeholders.NAME}
                {...register("fullName", {
                  required: {
                    value: true,
                    message: error_message.INCOMPLETE,
                  },
                  minLength: {
                    value: 2,
                    message: error_message.NAME_MINLENGTH,
                  },
                  maxLength: {
                    value: 20,
                    message: error_message.NAME_MAXLENGTH,
                  },
                  pattern: {
                    value: /^(?![\s.]+$)[a-zA-Z\s.]*$/,
                    message: error_message.INVALID_NAME,
                  },
                })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder={placeholders.EMAIL}
                {...register("email", {
                  required: {
                    value: true,
                    message: error_message.INCOMPLETE,
                  },
                  maxLength: {
                    value: 50,
                    message: error_message.EMAIL_MAXLENGTH,
                  },
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: error_message.INVALID_EMAIL,
                  },
                })}
              />
            </Form.Group>

            <Form.Group className="mb-3 passwordinput">
              <Form.Control
                type={shown ? "text" : "password"}
                placeholder={placeholders.PASSWORD}
                {...register("password", {
                  required: {
                    value: true,
                    message: error_message.INCOMPLETE,
                  },
                  pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
                    message: error_message.INVALID_PASSWORD,
                  },
                  maxLength: {
                    value: 15,
                    message: error_message.PASS_MAXLENGTH,
                  },
                  minLength: {
                    value: 6,
                    message: error_message.PASS_MINLENGTH,
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
                placeholder={placeholders.CONFIRM_PASSWORD}
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: error_message.INCOMPLETE,
                  },
                  pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
                    message: error_message.INVALID_PASSWORD,
                  },
                  maxLength: {
                    value: 15,
                    message: error_message.PASS_MAXLENGTH,
                  },
                  minLength: {
                    value: 8,
                    message: error_message.PASS_MINLENGTH,
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

            <div className="notification">
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
              <p>{statictext.SUBSCRIPTION_TEXT}</p>
            </div>

            <div className="errorSet">
              <span className="errorShow">
                {errors[Object.keys(errors)[0]] &&
                  errors[Object.keys(errors)[0]].message}{" "}
              </span>
            </div>

            <Button className="btn" type="submit">
              {statictext.CREATEACCOUNT}
            </Button>
            <div className="accountType">
              <p>
                {statictext.EXISTING_ACCOUNT}
                <span onClick={() => navigate("/Login")}>
                  {statictext.LOGIN_IN}
                </span>
              </p>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default SignupForm;
