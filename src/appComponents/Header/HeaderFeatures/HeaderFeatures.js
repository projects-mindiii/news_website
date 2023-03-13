import { NavLink } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./HeaderFeatures.css";

function HeaderFeatures() {
    const navigate = useNavigate();
    return (
        <>
            <div className="headerFeature" >
                <NavLink to="/">
                    <h5>CREATE PROFILE</h5>
                </NavLink>
                <span>|</span>
                {/* <NavLink to="/login"> */}
                <h5 onClick={() => navigate("/login")}>LOG IN</h5>
                {/* </NavLink> */}
            </div>


            {/* <div className="headerFeature" >
                <NavLink to="/">
                    <h5>BOOKMARKS</h5>
                </NavLink>
                <span>|</span>
                <NavLink to="/">
                    <h5>VIEW PROFILE</h5>
                </NavLink>
                <span>|</span>
                <NavLink to="/">
                    <h5>LOG OUT</h5>
                </NavLink>
            </div> */}
        </>
    );
}
export default HeaderFeatures;