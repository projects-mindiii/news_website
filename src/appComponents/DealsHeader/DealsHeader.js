import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./DealsHeader.css";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import dealsData from "./DealsData";


//-------Create a Deals Header component--------
function DealsHeader() {
    //set language
    const { t, i18n } = useTranslation();

    return (
        <div className="navHeader">
            <Navbar bg="light" variant="light">
                <Nav className="me-auto" as="ul">
                    {dealsData.map((item, index) => (
                        <Nav.Item as="li" key={index}>
                            <NavLink
                                className="nav"
                                to={item.link}
                            >
                                <img src={item.icon} alt="icon" className="icon" />
                                {item.text}
                            </NavLink>
                        </Nav.Item>
                    ))}
                    {/* <Nav.Item as="li">
                        <NavLink
                            className="nav"
                            to="/products"
                        >
                            <img src={Icon2} alt="icon" className="icon" />
                            {t("PRODUCTS")}
                        </NavLink>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <NavLink
                            className="nav"
                            to="/services"
                        >
                            <img src={Icon3} alt="icon" className="icon" />
                            {t("SERVICES")}
                        </NavLink>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <NavLink
                            className="nav"
                            to="/brands"
                        >
                            <img src={Icon4} alt="icon" className="icons" />
                            {t("BRANDS")}
                        </NavLink>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <NavLink
                            className="nav"
                            to="/companies"
                        >
                            <img src={Icon5} alt="icon" className="icon" />
                            {t("COMPANIES")}
                        </NavLink>
                    </Nav.Item> */}

                </Nav>
            </Navbar>
        </div>
    );
}
export default DealsHeader;