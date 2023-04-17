import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Footer from "../appComponents/Footer/Footer";
import Header from "../appComponents/Header/Header";
import ForgotPassword from "../authComponents/ForgotPassword/ForgotPassword";
import EmailVarify from "../authComponents/EmailVarification/EmailVarify";
import Login from "../authComponents/Login/Login";
import LoginForm from "../authComponents/Login/LoginForm/LoginForm";
import PasswordSent from "../authComponents/PasswordSent/PasswordSent";
import SignupForm from "../authComponents/SignupForm/SignupForm";
import LatestDeals from "../appComponents/LatestDeals/LatestDeals";
import Profile from "../appComponents/Profile/Profile";
import { useSelector } from "react-redux";
import ViewCompanyProfile from "../appComponents/ViewCompanyProfile/ViewCompanyProfile";



//-------Create a component for manage routing--------
function Routers() {
    const { currentUser } = useSelector((state) => state.user);

    return (
        <Router basename={"/"}>
            <Header />
            <Routes>
                <Route exact path="/" element={<Navigate to="/login" />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/login-form" element={<LoginForm />} />
                <Route exact path="/sign-up" element={<SignupForm />} />
                <Route exact path="/forgot-password" element={<ForgotPassword />} />
                <Route exact path="/password-sent" element={<PasswordSent />} />
                <Route exact path="/email-varify" element={<EmailVarify />} />
                <Route exact path="/deals/latest-deals" element={<LatestDeals />} />
                {/* <Route exact path="/deals/products" element={<Profile />} /> */}
                <Route exact path="/view-profile" element={Object.keys(currentUser).length!==0?(<Profile />):(<Navigate to="/login" />)} />
                <Route exact path="/deals/latest-deals/company-profile" element={<ViewCompanyProfile/>} />
                
            </Routes>
            <Footer />
        </Router>

    )
}
export default Routers;
