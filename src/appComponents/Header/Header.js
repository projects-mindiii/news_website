import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import Banner from "../../assets/images/classifiedheader.png";
import DealsHeader from "../DealsHeader/DealsHeader";
import SearchBar from "../Search/SearchBar";
import "./Header.css";
import HeaderFeatures from "./HeaderFeatures/HeaderFeatures";
import HeaderData from "./HeaderData";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { guestUserLogin, getMetaListApi } from "../../store/slices/UserSlice";
import ClassifiedCountry from "../ClassiFieds/ClassifiedCountry";
import Loader from "../../utils/Loader/Loader";

//-------Create a Header component--------
function Header() {
  const dispatch = useDispatch();
  const location = useLocation();

  const { guestUser, currentUser, isLoading, userToken } = useSelector(
    (state) => state.user
  );

  function GetMetaList(userToken) {
    dispatch(getMetaListApi(userToken));
  }

  function GuestLogin() {
    dispatch(guestUserLogin()).then((responseJson) => {
      const response = responseJson.payload;
      GetMetaList(response.data.token);
    });
  }

  // ======Calling Api for guest user login======
  useEffect(() => {
    if (
      Object.keys(currentUser).length === 0 &&
      Object.keys(guestUser).length === 0
    ) {
      GuestLogin();
    } else {
      GetMetaList(userToken);
    }
  }, []);

  return (
    <section className="header">
      {isLoading === true ? <Loader /> : ""}
      <Container>
        <div className="headerSection">
          <div className="logoImg">
            <img src={Logo} alt="news-logo" />
          </div>
          {/* {location.pathname == "/classifieds" || location.pathname == "/job-types" ?
            <div className="bannerImg">
              <img src={Banner} alt="news-logo" />
            </div> : ""} */}

          {location.pathname == "/classifieds" ||
          location.pathname == "/job-types" ? (
            <div className="bannerImg">
              <iframe
                src="https://www.signafrica.com?_dnid=84025&t=1682676851"
                style={{
                  width: "100%",
                  height: "95%",
                  margin: "0px",
                  border: "none",
                  scrollBehavior: "none",
                }}
              ></iframe>
            </div>
          ) : (
            ""
          )}

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
            {location.pathname == "/deals/latest-deals" ||
            location.pathname.match("/deals/latest-deals/company-profile/") ? (
              <DealsHeader />
            ) : (
              ""
            )}
            {location.pathname == "/classifieds" ||
            location.pathname == "/job-types" ? (
              <ClassifiedCountry />
            ) : (
              ""
            )}
            <SearchBar />
          </div>
        </div>
      </Container>
    </section>
  );
}
export default Header;
