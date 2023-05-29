import React from "react";
import AppleLogin from "react-apple-login";
import Apple from "../../assets/images/apple_logo.png";
import axios from "axios";
import { Toast } from "../../utils/Toaster";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { STATUS_CODES } from "../../utils/StatusCode";
import { SOCIAL_TYPE } from "../../utils/Constants";
import { isSocialLogin, socialSignup } from "../../store/slices/UserSlice";

function AppleSocialLogin(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
// function for apple login
  const responseApple = async (response) => {
    if(!response.error) {
    console.log(response)
      let requestData = new FormData();
      requestData.append("social_id", response.authorization.id_token);
      requestData.append("social_type", SOCIAL_TYPE.APPLE);
      requestData.append(
        "email",
        response && response.user && response.user.email
          ? response.user.email
          : ""
      );
      requestData.append("user_type", 1);
      requestData.append("divice_name", props.browserName);
      await dispatch(isSocialLogin(requestData)).then(async (responsejson) => {
        if (responsejson.status_code === STATUS_CODES.SUCCESS) {
          Toast.fire({
            icon: "success",
            title: responsejson.message,
          });
          navigate("/deals/latest-deals");
        } else if (
          responsejson.data?.status_code == STATUS_CODES.SOCIAL_USER_NOT_FOUND
        ) {
          await dispatch(socialSignup(requestData)).then((responsejson) => {
            if (responsejson.status_code === STATUS_CODES.SUCCESS) {
              Toast.fire({
                icon: "success",
                title: responsejson.data.message,
              });
              navigate("/deals/latest-deals");
            }
          });
        } else {
          Toast.fire({
            icon: "Error",
            title: responsejson.message,
          });
        }
      });
     }
    }
  

  return (
    <>
      <img src={Apple} alt="apple-logo" />
      <AppleLogin
        clientId="qvaring.reactJs.com"
        redirectURI={process.env.REACT_APP_APPLE_REDIRECT_KEY}
        usePopup={true}
        callback={responseApple} 
        scope="email name"
        responseMode="query"
        render={(
          renderProps
        ) => (
          <div onClick={renderProps.onClick}>
            {props.appleText &&<h3>{props.appleText}</h3>}
          </div>
        )}
      />
    </>
  );
}

export default AppleSocialLogin;
