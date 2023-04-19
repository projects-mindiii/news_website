import { useGoogleLogin } from "@react-oauth/google";
import "../Login/Login.css";
import SublyApi from "../../helpers/Api";
import { Toast } from "../../utils/Toaster";
import { STATUS_CODES } from "../../utils/StatusCode";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Google from "../../assets/images/google_logo.png";
import { isSocialLogin, socialSignup } from "../../store/slices/UserSlice";
import { SOCIAL_TYPE } from "../../utils/Constants";

function GoogleLogin(props) {
  const navigate = useNavigate();
  //set language
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { currentUser, isLoading } = useSelector((state) => state.user);

  // Social Login with google
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => getUserDetail(tokenResponse),
  });
  async function getUserDetail(value) {
    await SublyApi.verifyGoogleLogin({access_token:value.access_token}).then((response) => {
      if (response.status_code === STATUS_CODES.SUCCESS) {
        responseGoogle(response.data);
      } else if (response.status_code === 400) {
        Toast.fire({
          icon: "error",
          title: response.data.message,
        });
      }
    });
  }

  // Social Login with Google
  const responseGoogle = async (response) => {
    let userData = response;
    if (userData) {
      let requestData = new FormData();
      requestData.append("name", userData.name);
      requestData.append("social_type", SOCIAL_TYPE.GOOGLE);
      requestData.append("social_key", userData.sub);
      requestData.append("email", userData.email);
      requestData.append("profile_url", userData.picture);
      await dispatch(isSocialLogin(requestData)).then(async (responsejson) => {
        const response = responsejson.payload;
        if (response.status_code === STATUS_CODES.SUCCESS) {
          Toast.fire({
            icon: "success",
            title: response.message,
          });
          navigate("/deals/latest-deals");
          localStorage.setItem("token", response.data.token);
        } else if (response.data.status_code == STATUS_CODES.PAGE_NOT_FOUND) {
          await dispatch(socialSignup(requestData)).then((signresponsejson) => {
            console.log("api socialSignup responsejson", signresponsejson);
            const response = signresponsejson.payload;
            if (response.status_code === STATUS_CODES.SUCCESS) {
              Toast.fire({
                icon: "success",
                title: response.message,
              });
              navigate("/deals/latest-deals");
              localStorage.setItem("token", signresponsejson.data.token);
            } else {
              Toast.fire({
                icon: "error",
                title: response.data.message,
              });
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
    
      <img src={Google} alt="google-logo" onClick={() => login()} />
     
      {props.googleText && <h3 onClick={() => login()}>{props.googleText} </h3>}
    </>
  );
}

export default GoogleLogin;
