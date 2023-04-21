import { Nav, Navbar } from "react-bootstrap";
import { NavLink,useNavigate } from "react-router-dom";
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


//-------Create a Deals Header component--------
function DealsHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [navBar, setNavBar] = useState(null);
  const { userToken,isLoading } = useSelector((state) => state.user);

  //set language

  useEffect(() => {
    dispatch(getDealList(userToken)).then(async(responsejson) => {
        const response = responsejson.payload;
        if (response.status === STATUS_CODES.INVALID_TOKEN) {
          Toast.fire({
              icon: "error",
              title: t("SESSION_EXPIRE"),
          });
          await dispatch(userLogout());
          await dispatch(guestUserLogin());
          navigate("/login");
        }else{
          Toast.fire({
              icon: "error",
              title: response.data.message,
          });
        }
    });
  }, []);

  return (
    <div className="navHeader">
      <Navbar bg="light" variant="light">
        <Nav className="me-auto" as="ul">
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
        </Nav>
      </Navbar>
    </div>
  );
}
export default DealsHeader;
