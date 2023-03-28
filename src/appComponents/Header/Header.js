import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import DealsHeader from "../DealsHeader/DealsHeader";
import SearchBar from "../Search/SearchBar";
import "./Header.css";
import HeaderFeatures from "./HeaderFeatures/HeaderFeatures";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

//-------Create a Header component--------
function Header() {
    //set language
  const { t, i18n } = useTranslation();
    return (
        <section className="header">
            <Container>
                <div className="headerSection">
                    <div className="logoImg">
                        <img src={Logo} alt="news-logo" />
                    </div>
                    <Navbar expand="lg">
                        <div className="navItem">
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav" >
                                <Nav className="ml-auto" as="ul">
                                    <Nav.Item as="li">
                                        <NavLink
                                            className="nav-link"
                                            to="/deals"
                                        >
                                           {t("DEALS")}
                                        </NavLink>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <NavLink
                                            className="nav-link"
                                            to="/classified"
                                        >
                                            {t("CLASSIFIEDS")}
                                        </NavLink>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <NavLink
                                            className="nav-link"
                                            to="/job"
                                        >
                                           {t("JOBS")}
                                        </NavLink>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <NavLink
                                            className="nav-link"
                                            to="/post"
                                        >
                                           {t("POST_ADVERT")}
                                        </NavLink>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <NavLink
                                            className="nav-link"
                                            to="/ads"
                                        >
                                            {t("YOUR_ADS")}
                                        </NavLink>
                                    </Nav.Item>
                                </Nav>
                            </Navbar.Collapse>

                            <HeaderFeatures />
                        </div>
                    </Navbar>

                    {/* -------DealsHeaderSection-------- */}
                    <div className="dealHeader">
                        <DealsHeader />
                        <SearchBar />
                    </div>

                </div>
            </Container>
        </section >
    );
}
export default Header;
