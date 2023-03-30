import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Footer from "../appComponents/Footer/Footer";
import Header from "../appComponents/Header/Header";
import ForgotPassword from "../authComponents/ForgotPassword/ForgotPassword";
import Login from "../authComponents/Login/Login";
import LoginForm from "../authComponents/Login/LoginForm/LoginForm";
import PasswordSent from "../authComponents/PasswordSent/PasswordSent";
import SignupForm from "../authComponents/SignupForm/SignupForm";

//-------Create a component for manage routing--------
function Routers() {
    return (
        <Router basename={"/"}>
            <Header />
            <Routes>
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/login-form" element={<LoginForm />} />
                <Route exact path="/sign-up" element={<SignupForm />} />
                <Route exact path="/forgot-password" element={<ForgotPassword/>} />
                <Route exact path="/password-sent" element={<PasswordSent/>} />
            </Routes>
            <Footer />
        </Router>

    )
}
export default Routers;