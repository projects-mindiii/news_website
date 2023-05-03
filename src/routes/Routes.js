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
import LatestDeals from "../appComponents/DealModule/LatestDeals/LatestDeals";
import Profile from "../appComponents/Profile/Profile";
import { useSelector } from "react-redux";
import ViewCompanyProfile from "../appComponents/ViewCompanyProfile/ViewCompanyProfile";
import ClassiFieds from "../appComponents/ClassiFieds/ClassiFieds";
import PageNotFound from "../appComponents/PageNotFound/PageNotFound";
import JobTypes from "../appComponents/ClassiFieds/JobTypes";
import YourAdd from "../appComponents/YourAdd/YourAdd";
import PostAdvert from "../appComponents/PostAdvert/PostAdvert";
import Products from "../appComponents/DealTypesModule/Products/Products";
import Services from "../appComponents/DealTypesModule/Services/Services";
import Brands from "../appComponents/DealTypesModule/Brands/Brands";
import Companies from "../appComponents/DealTypesModule/Companies/Companies";
import LoginAlertModel from "../authComponents/LoginAlertModel/LoginAlertModel";
import BookMarks from "../appComponents/BookMarks/BookMarks";


//-------Create a component for manage routing--------
function Routers() {
    const { currentUser } = useSelector((state) => state.user);

    return (
        <Router basename={"/"}>
            <Header />
            <Routes>
                <Route exact path="/" element={<Navigate to="/deals/latest-deals" />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/login-form" element={<LoginForm />} />
                <Route exact path="/sign-up" element={<SignupForm />} />
                <Route exact path="/forgot-password" element={<ForgotPassword />} />
                <Route exact path="/password-sent" element={<PasswordSent />} />
                <Route exact path="/email-varify" element={<EmailVarify />} />
                <Route exact path="/deals/latest-deals" element={<LatestDeals />} />
                <Route exact path="/view-profile" element={Object.keys(currentUser).length !== 0 ? (<Profile />) : (<Navigate to="/login" />)} />
                <Route exact path="/deals/latest-deals/company-profile/:id" element={<ViewCompanyProfile />} />
                <Route exact path="/classifieds" element={<ClassiFieds />} />
                <Route exact path="/deals/products" element={<Products />} />
                <Route exact path="/deals/services" element={<Services />} />
                <Route exact path="/deals/brands" element={<Brands />} />
                <Route exact path="/deals/companies" element={<Companies />} />
                <Route exact path="/job-types" element={<JobTypes/>} />
                <Route exact path="/Post-advert" element={Object.keys(currentUser).length !== 0 ? (<PostAdvert />) : (<LoginAlertModel modalValue={true}/>)} />
                <Route exact path="/your-add" element={Object.keys(currentUser).length !== 0 ? (<YourAdd />) : (<LoginAlertModel modalValue={true}/>)} />
                <Route path="/book-marks" element={<BookMarks />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer />
        </Router>


    )
}
export default Routers;
