import "../Login/Login.css";
import Facebook from "../../assets/images/facebook_logo.png";
import { Toast } from "../../utils/Toaster";
import { STATUS_CODES } from "../../utils/StatusCode";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { isSocialLogin, socialSignup } from "../../store/slices/UserSlice";
import { SOCIAL_TYPE } from "../../utils/Constants";
// import FacebookLogin from "react-facebook-login";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

function FacebookSocialLogin(props) {
  const navigate = useNavigate();
  //set language
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { currentUser, isLoading } = useSelector((state) => state.user);
  // Social Login with facebook.
  const responseFacebook = async (response) => {
    let userData = response;
    if (userData) {
      let requestData = new FormData();
      requestData.append("name", userData.name);
      requestData.append("social_type", SOCIAL_TYPE.FACEBOOK);
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
          responsejson.data.status_code == STATUS_CODES.SOCIAL_USER_NOT_FOUND
        ) {
          await dispatch(socialSignup(requestData)).then((signresponsejson) => {
            console.log("api socialSignup responsejson", signresponsejson);
            if (responsejson.status_code === STATUS_CODES.SUCCESS) {
              Toast.fire({
                icon: "success",
                title: responsejson.message,
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
    <>
      {/* <img src={Facebook} alt="facebook-logo" /> 
        <FacebookLogin
        appId={process.env.REACT_APP_FACEBOOK_APP_ID}
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
        cssClass="my-facebook-button-class"
        textButton={props.facebookText && <h3>{props.facebookText}</h3>}
      // textButton={<h3></h3>}
      // onFailure={(value) => console.log(value)}
      />   */}

      <FacebookLogin
        appId={process.env.REACT_APP_FACEBOOK_APP_ID}
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
        cssClass="my-facebook-button-class"
        render={renderProps => (
          <button onClick={renderProps.onClick}><img src={Facebook} alt="facebook-logo" /><h3>{props.facebookText}</h3></button>
        )}
      />
    </>

  );
}

export default FacebookSocialLogin;
