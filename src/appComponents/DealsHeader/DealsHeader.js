import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./DealsHeader.css";
import Icon1 from "../../assets/images/icon1.png";
import Icon2 from "../../assets/images/icon2.png";
import Icon3 from "../../assets/images/icon3.png";
import Icon4 from "../../assets/images/icon4.png";
import Icon5 from "../../assets/images/icon5.png";

//-------Create a Deals Header component--------
function DealsHeader() {
    return (
        <div className="navHeader">
            <Navbar bg="light" variant="light">
                <Nav className="me-auto" as="ul">
                    <Nav.Item as="li">
                        <NavLink
                            className="nav"
                            to="/latest-deals"
                        >
                            <img src={Icon1} alt="icon" className="icon" />
                            LALEST DEALS
                        </NavLink>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <NavLink
                            className="nav"
                            to="/products"
                        >
                            <img src={Icon2} alt="icon" className="icon" />
                            PRODUCTS
                        </NavLink>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <NavLink
                            className="nav"
                            to="/services"
                        >
                            <img src={Icon3} alt="icon" className="icon" />
                            SERVICES
                        </NavLink>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <NavLink
                            className="nav"
                            to="/brands"
                        >
                            <img src={Icon4} alt="icon" className="icons" />
                            BRANDS
                        </NavLink>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <NavLink
                            className="nav"
                            to="/companies"
                        >
                            <img src={Icon5} alt="icon" className="icon" />
                            COMPANIES
                        </NavLink>
                    </Nav.Item>

                </Nav>
            </Navbar>
        </div>
    );
}
export default DealsHeader;