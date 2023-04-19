import { Container, Nav, Navbar, Toast } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import DealsHeader from "../DealsHeader/DealsHeader";
import SearchBar from "../Search/SearchBar";
import "./Header.css";
import HeaderFeatures from "./HeaderFeatures/HeaderFeatures";
import HeaderData from "./HeaderData";
import { useEffect } from "react";
import { useDispatch,useSelector } from 'react-redux';
import { guestUserLogin } from "../../store/slices/UserSlice";
import ClassifiedCountry from "../ClassiFieds/ClassifiedCountry";

//-------Create a Header component--------
function Header() {
  const dispatch = useDispatch();

  const  {guestUser,currentUser,isLoading}  = useSelector((state) => state.user);

  // ======Calling Api for guest user login======
  useEffect(() => {
    async function GuestLogin() {
      await dispatch(guestUserLogin()).then((responseJson) => {
        const response = responseJson.payload;
        if (response.status_code === 200) {
            Toast.fire({
              icon: "error",
              title: response.data.message,
            });
        }
      });
    }
    if(Object.keys(currentUser).length===0 && Object.keys(guestUser).length===0){
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
            <DealsHeader />
            <ClassifiedCountry/>
            <SearchBar />
          </div>
        </div>
      </Container>
    </section>
  );
}
export default Header;
