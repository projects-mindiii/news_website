import { Container } from "react-bootstrap";
import "./Login.css";
import Email from "../../assets/images/email_logo.png";
import Google from "../../assets/images/google_logo.png";
import Facebook from "../../assets/images/facebook_logo.png";
import Apple from "../../assets/images/apple_logo.png";
import Linkedin from "../../assets/images/linkdin_logo.png";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    return (
        <div className="main">
            <Container>
                <div className="signupForm">
                    <div className="topHeading">
                        <h1>LOGIN</h1>
                    </div>

                    <div className="loginComponents" onClick={() => navigate("/login-form")}>
                        <img src={Email} alt="email-logo" />
                        <h3>Login With Email</h3>
                    </div>

                    <div className="loginComponents">
                        <img src={Google} alt="google-logo" />
                        <h3>Login With Google</h3>
                    </div>
                    <div className="loginComponents">
                        <img src={Facebook} alt="facebook-logo" />
                        <h3>Login With Facebook</h3>
                    </div>
                    <div className="loginComponents">
                        <img src={Apple} alt="apple-logo" />
                        <h3>Login With Apple</h3>
                    </div>
                    <div className="loginComponents">
                        <img src={Linkedin} alt="linkedin-logo" />
                        <h3>Login With Linkedin</h3>
                    </div>
                    <div className="accountType">
                        <p> Don't have an account ? <span onClick={() => navigate("/sign-up")}>SignUp</span></p>
                    </div>
                </div>

            </Container>
        </div>
    );
}
export default Login;  
