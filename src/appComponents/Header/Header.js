import { Container, Nav, Navbar, Toast } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import DealsHeader from "../DealsHeader/DealsHeader";
import SearchBar from "../Search/SearchBar";
import "./Header.css";
import HeaderFeatures from "./HeaderFeatures/HeaderFeatures";
import HeaderData from "./HeaderData";
import { useEffect } from "react";
import SublyApi from "../../helpers/Api";

//-------Create a Header component--------
function Header() {
  // ======Calling Api for guest user login======
  useEffect(() => {
    async function GuestLogin() {
      await SublyApi.guestUserLogin().then((responseJson) => {
        if (responseJson.status_code === 200) {
          localStorage.setItem("token", responseJson.data.token);
        } else {
          Toast.fire({
            icon: "error",
            title: responseJson.data.message,
          });
        }
      });
    }
    GuestLogin();
  }, []);
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
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="" as="ul">
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
            <DealsHeader />
            <SearchBar />
          </div>
        </div>
      </Container>
    </section>
  );
}
export default Header;
