import { Container, Nav, Navbar, Toast } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import Banner from "../../assets/images/classifiedheader.png"
import DealsHeader from "../DealsHeader/DealsHeader";
import SearchBar from "../Search/SearchBar";
import "./Header.css";
import HeaderFeatures from "./HeaderFeatures/HeaderFeatures";
import HeaderData from "./HeaderData";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { guestUserLogin } from "../../store/slices/UserSlice";
import ClassifiedCountry from "../ClassiFieds/ClassifiedCountry";

//-------Create a Header component--------
function Header() {
  const dispatch = useDispatch();
  const location = useLocation();

  const { guestUser, currentUser, isLoading } = useSelector(
    (state) => state.user
  );

  // ======Calling Api for guest user login======
  useEffect(() => {
    async function GuestLogin() {
      await dispatch(guestUserLogin()).then((responseJson) => {
        const response = responseJson.payload;
      });
    }
    if (
      Object.keys(currentUser).length === 0 &&
      Object.keys(guestUser).length === 0
    ) {
      GuestLogin();
    }
  }, []);
  return (
    <section className="header">
      <Container>
        <div className="headerSection">
          <div className="logoImg">
            <img src={Logo} alt="news-logo" />
          </div>
          {location.pathname == "/classifieds" ? 
          <div className="bannerImg">
            <img src={Banner} alt="news-logo" />
          </div>: ""}
          <Navbar expand="lg">
            <div className="navItem headerLinks">
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ulValue" as="ul">
                  {HeaderData.map((item, index) => (
                    <Nav.Item as="li" key={index}>
                      <NavLink className={`nav-link`} to={item.link}>
                        {item.text}
                      </NavLink>
                    </Nav.Item>
                  ))}
                </Nav>
              </Navbar.Collapse>
              <HeaderFeatures />
            </div>
          </Navbar>

          {/* -------DealsHeaderSection-------- */}
          <div className="dealHeader">
            {location.pathname == "/deals/latest-deals" ? <DealsHeader /> : ""}
            {location.pathname == "/classifieds" ? <ClassifiedCountry /> : ""}
            <SearchBar />
          </div>
        </div>
      </Container>
    </section>
  );
}
export default Header;
