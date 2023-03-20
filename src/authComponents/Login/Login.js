import { Container } from "react-bootstrap";
import "./Login.css";
import Email from "../../assets/images/email_logo.png";
import Google from "../../assets/images/google_logo.png";
import Facebook from "../../assets/images/facebook_logo.png";
import Apple from "../../assets/images/apple_logo.png";
import Linkedin from "../../assets/images/linkdin_logo.png";

function Login() {
    return (
        <div className="main">
            <Container>
                <div className="signupForm">
                    <div className="topHeading">
                        <h1>Login</h1>
                    </div>
                    <div className="loginComponents">
                        <img src={Email} alt="news-logo" />
                        <h3>Login With Email</h3>
                    </div>
                    <div className="loginComponents">
                        <img src={Google} alt="news-logo" />
                        <h3>Login With Google</h3>
                    </div>
                    <div className="loginComponents">
                        <img src={Facebook} alt="news-logo" />
                        <h3>Login With Facebook</h3>
                    </div>
                    <div className="loginComponents">
                        <img src={Apple} alt="news-logo" />
                        <h3>Login With Apple</h3>
                    </div>
                    <div className="loginComponents">
                        <img src={Linkedin} alt="news-logo" />
                        <h3>Login With Linkedin</h3>
                    </div>
                    <div className="accountType">
                        <p> Don't have an account ? <span>SignUp</span></p>
                    </div>
                </div>

            </Container>
        </div>
    );
}
export default Login;