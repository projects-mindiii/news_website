import React from "react";
import { useLinkedIn } from "react-linkedin-login-oauth2";
import Linkedin from "../../assets/images/linkdin_logo.png";
import { LinkedIn } from "react-linkedin-login-oauth2";
import { SOCIAL_TYPE } from "../../utils/Constants";
import { STATUS_CODES } from "../../utils/StatusCode";
import { isSocialLogin, socialSignup } from "../../store/slices/UserSlice";
import { Toast } from "../../utils/Toaster";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function LinkedInLogin(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSuccess = async (response) => {
    console.log(onSuccess);
    let userData = response;
    if (userData) {
      let requestData = new FormData();
      requestData.append("name", userData.name);
      requestData.append("social_id", response.authorization.id_token);
      requestData.append("social_type", SOCIAL_TYPE.LINKEDIN);
      requestData.append("social_key", userData.id);
      requestData.append("email", userData.email);
      requestData.append("profile_url", "");
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
          await dispatch(socialSignup(requestData)).then((signresponsejson) => {
            if (signresponsejson.status_code === STATUS_CODES.SUCCESS) {
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
  };

  return (
    <LinkedIn
      clientId="86vhj2q7ukf83q"
      redirectUri={`${window.location.origin}/linkedin`}
      onSuccess={onSuccess}
      onError={(error) => {
        console.log(error);
      }}
    >
      {({ linkedInLogin }) => (
        <>
          <img
            onClick={linkedInLogin}
            src={Linkedin}
            alt="Sign in with Linked In"
          />
          {props.linkedinText && (
            <h3 onClick={linkedInLogin}>{props.linkedinText}</h3>
          )}
        </>
      )}
    </LinkedIn>
  );
}

export default LinkedInLogin;
