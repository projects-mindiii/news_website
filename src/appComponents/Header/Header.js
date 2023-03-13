import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import DealsHeader from "../DealsHeader/DealsHeader";
import SearchBar from "../Search/SearchBar";
import "./Header.css";
import HeaderFeatures from "./HeaderFeatures/HeaderFeatures";

//-------Create a Header component--------
function Header() {
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
                                            DEALS/HUB
                                        </NavLink>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <NavLink
                                            className="nav-link"
                                            to="/classified"
                                        >
                                            CLASSIFIEDS
                                        </NavLink>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <NavLink
                                            className="nav-link"
                                            to="/job"
                                        >
                                            JOBS
                                        </NavLink>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <NavLink
                                            className="nav-link"
                                            to="/post"
                                        >
                                            POST ADVERT
                                        </NavLink>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <NavLink
                                            className="nav-link"
                                            to="/ads"
                                        >
                                            YOUR ADS
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
