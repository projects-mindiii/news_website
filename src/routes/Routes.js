import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Footer from "../appComponents/Footer/Footer";
import Header from "../appComponents/Header/Header";
import Login from "../authComponents/Login/Login";

//-------Create a component for manage routing--------
function Routers() {
    return (
        <Router basename={"/"}>
            <Header />
            <Routes>
                <Route exact path="/login" element={<Login />} />
            </Routes>
            <Footer />
        </Router>

    )
}
export default Routers;