import { Container, Nav, Navbar, Row, Col } from "react-bootstrap";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./DealsHeader.css";
import dealsData from "./DealsData";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDealList } from "../../store/slices/DealSlice";
import { userLogout } from "../../store/slices/UserSlice";
import { Toast } from "../../utils/Toaster";
import { STATUS_CODES } from "../../utils/StatusCode";
import { useTranslation } from "react-i18next";
import { guestUserLogin } from "../../store/slices/UserSlice";
import Loader from "../../utils/Loader/Loader";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

//-------Create a Deals Header component--------
function DealsHeader() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [navBar, setNavBar] = useState(null);
  const { userToken, isLoading } = useSelector((state) => state.user);

  const settings = {
    className: "slider variable-width",
    dots: false,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: false,
    autoplaySpeed: 2000,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1080,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 492,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 340,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  useEffect(() => {
    dispatch(getDealList({ userToken: userToken, companyOrder: 2 })).then(async (responsejson) => {
      const response = responsejson.payload;
      if (response.status_code !== STATUS_CODES.SUCCESS) {

        if (response.status === STATUS_CODES.INVALID_TOKEN) {
          // Toast.fire({
          //   icon: "error",
          //   title: t("SESSION_EXPIRE"),
          // });
          await dispatch(userLogout(userToken)).then(() => {
            dispatch(guestUserLogin());
            navigate("/login");
          })
        } else {
          Toast.fire({
            icon: "error",
            title: response.data.message,
          });
        }

      }
    });
  }, []);

  return (
    <>
      {isLoading === true ? (
        <Loader />
      ) : ""}
      {/* <div className="navHeader d-flex">
        {(location.pathname.match("/deals/companies/company-profile/")) ?
          (<div className="backarrowButton" >
            <MdOutlineKeyboardArrowLeft onClick={() => navigate(-1)} />
          </div>) : ""}
        <div>
          <Navbar bg="light" variant="light">
            <Nav className="me-auto ulValue1" as="ul">
              <Slider {...settings}>
                {dealsData.map((item, index) => (
                  <Nav.Item as="li" key={index}>
                    <NavLink
                      className="nav"
                      to={item.link}
                      onClick={() => {
                        setNavBar(item.id);
                      }}
                    >
                      <img src={item.icon} alt="icon" className="icon" />
                      {item.text}
                    </NavLink>
                  </Nav.Item>
                ))}
              </Slider>
            </Nav>
          </Navbar>
        </div>
      </div> */}
      <div style={{ display: "flex", flexWrap: "wrap" }} className="navHeader">
        {(location.pathname.match("/deals/companies/company-profile/")) ?
          (<span className="backarrowButton" >
            <MdOutlineKeyboardArrowLeft onClick={() => navigate(-1)} />
          </span>) : ""}

        <div style={{ flex: "0 0 auto" }} className={`${location.pathname.match("/deals/companies/company-profile/") ? "navWithBack" : "navWithoutBack"}`}>
          <Navbar bg="light" variant="light">
            <Nav className="me-auto rowRemove" as="ul">
              <Slider {...settings}>
                {dealsData.map((item, index) => (
                  <Nav.Item as="li" key={index}>
                    <NavLink
                      className="nav"
                      to={item.link}
                      onClick={() => {
                        setNavBar(item.id);
                      }}
                    >
                      <img src={item.icon} alt="icon" className="icon" />
                      {item.text}
                    </NavLink>
                  </Nav.Item>
                ))}
              </Slider>
            </Nav>
          </Navbar>
        </div>
      </div>
    </>

  );
}
export default DealsHeader;
