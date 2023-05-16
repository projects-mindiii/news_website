import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/news_logo.svg";
import DealsHeader from "../DealsHeader/DealsHeader";
import SearchBar from "../Search/SearchBar";
import "./Header.css";
import HeaderFeatures from "./HeaderFeatures/HeaderFeatures";
import HeaderData from "./HeaderData";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { guestUserLogin, getMetaListApi, userLogout } from "../../store/slices/UserSlice";
import ClassifiedCountry from "../ClassiFieds/ClassifiedCountry";
import Loader from "../../utils/Loader/Loader";
import { STATUS_CODES } from "../../utils/StatusCode";
import { Toast } from "../../utils/Toaster";
//-------Create a Header component--------
function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  function handleResponse(responsejson) {
    console.log('aaaaaaaaaresponsejson', responsejson)
    if (responsejson.status_code) {
      if (responsejson.status_code === STATUS_CODES.INVALID_TOKEN) {
        dispatch(userLogout());
        dispatch(guestUserLogin());
        navigate("/login");
      }
    } else {
      if (responsejson.status === STATUS_CODES.INVALID_TOKEN) {
        dispatch(userLogout());
        dispatch(guestUserLogin());
        navigate("/login");
      }
    }

  }

  const { guestUser, currentUser, isLoading, userToken } = useSelector(
    (state) => state.user
  );

  function GetMetaList(userToken) {
    dispatch(getMetaListApi(userToken)).then((responseJson) => {
      const response = responseJson.payload;
      handleResponse(response);
    });
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
          {location.pathname == "/classifieds" ||
            location.pathname == "/job-types" ? (
            <div className="bannerImg">
              <iframe
                src={process.env.REACT_APP_CLASSIFIED_HEADER_IFRAME_URL}
                style={{
                  width: "100%",
                  height: "95%",
                  margin: "0px",
                  border: "none",
                  scrollBehavior: "none",
                  allowfullscreen: "true"
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
          <Row>
            <Col xl={8} lg={8} md={12} sm={12}>
              {location.pathname == "/deals/latest-deals" ||
                location.pathname.match("/deals/latest-deals/company-profile/") || location.pathname == "/deals/products"
                || location.pathname == "/deals/services" || location.pathname == "/deals/brands" ||
                location.pathname == "/deals/companies" ? (
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
            </Col>
            <Col xl={4} lg={4} md={12} sm={12}>
              <SearchBar />
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
}
export default Header;
