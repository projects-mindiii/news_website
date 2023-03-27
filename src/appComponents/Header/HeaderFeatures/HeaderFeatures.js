import { NavLink } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./HeaderFeatures.css";

function HeaderFeatures() {
    const navigate = useNavigate();
    return (
        <>
            <div className="headerFeature" >
                <h5 onClick={() => navigate("/sign-up")}>CREATE PROFILE</h5>
                <span>|</span>
                <h5 onClick={() => navigate("/login")}>LOG IN</h5>
            </div>


            {/* <div className="headerFeature" >
                    <h5>BOOKMARKS</h5>
                <span>|</span>
                    <h5>VIEW PROFILE</h5>
                <span>|</span>
                    <h5>LOG OUT</h5>
            </div> */}
        </>
    );
}
export default HeaderFeatures;