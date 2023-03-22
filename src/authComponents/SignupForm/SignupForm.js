import { useState} from "react";
import "./SignupForm.css";
import "../../assets/styles/Common.css"
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { statictext} from "../../CommonStaticText";
// Form for singing up new users.

function SignupForm() {
  const navigate = useNavigate();
  //sets toggle for showing and hiding password
  const [shown, setShown] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);
  //sets toggle for subscribe button on/off
  const[notification, setNotification]=useState(false);
 
 
  // function for form validation using useform
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  
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
                  placeholder="Full Name"
                  {...register("fullName", {
                    required: {
                      value: true,
                      message: "Form incomplete, please fill all fields",
                    },
                    minLength: {
                      value: 2,
                      message: "Please enter valid name",
                    },
                    maxLength: {
                      value: 20,
                      message: "Name must be 20 character or small",
                    },
                    pattern: {
                      value: /^(?![\s.]+$)[a-zA-Z\s.]*$/,
                      message: "Please enter valid name",
                    },
                  })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
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
                      message: "invalid email address",
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
                        value:  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message: "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one special character",
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
              
              <Form.Group className="mb-3 passwordinput">
                <Form.Control
                  type={passwordShow ? "text" : "password"}
                  placeholder="Confirm Password"
                  {...register("confirmPassword", {
                    required: true,
                    message: "Form incomplete, please fill all fields",
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
                    <BsToggleOn className="icon" onClick={() => setNotification(!notification)} />
                  ) : (
                    <BsToggleOff
                      className="icon"
                      onClick={() => setNotification(!notification)}
                    />
                  )}
                  <p>Subscribe to our newsletter</p>
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
                  Already have an account ? <span  onClick={() => navigate("/Login")}>Login</span>
                </p>
              </div>
            </Form>
          </div>
       
      </Container>
    </div>
  );
}

export default SignupForm;
