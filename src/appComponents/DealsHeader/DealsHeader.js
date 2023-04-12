import { Nav, Navbar, Toast } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./DealsHeader.css";
import dealsData from "./DealsData";
import { useEffect, useState } from "react";
import SublyApi from "../../helpers/Api";

//-------Create a Deals Header component--------
function DealsHeader() {
    const [navBar, setNavBar] = useState(null)
    console.log("navBar", navBar)
  //set language

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
  }, [navBar]);

  return (
    <div className="navHeader">
      <Navbar bg="light" variant="light">
        <Nav className="me-auto" as="ul" >
          {dealsData.map((item, index) => (
            <Nav.Item as="li" key={index}>
              <NavLink className="nav" to={item.link} onClick={()=>{setNavBar(item.id)}}>
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
