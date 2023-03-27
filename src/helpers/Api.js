import axios from "axios";

const BASE_URL = "";
// const REACT_PROXYURL = "https://quiet-retreat-79741.herokuapp.com/";
const REACT_PROXYURL = "";

/** API Class
 * static clase trying together method used to get/send to the API.
 * There shouldn't be any frontend-specific stuff here, and there  shouldn't be any API-aware stuff else hre in the frontend...
 */
class SublyApi {
  //token which interact with the API will be stored here.
  static token;
  static async request(endpoint, data = {}, method = "get", header) {
    const url = `${REACT_PROXYURL}${BASE_URL}${endpoint}`;
    const headers = header || { Authorization: `Bearer ${SublyApi.token}` };
    const params = method === "get" ? data : {};
    try {
      const result = await axios({ url, method, data, params, headers });
      return result ? result.data : "There is no return for this route";
    } catch (err) {
      return err.response;
    }
  }

  /* ------SIGNUP API ROUTES -----*/
  /* POST  /signup: {email,password}
     Signup
     
     Authorization required:none
     
     @param data {Object} {email,password}
     @returns {object} {token}
     */
  static async varifySignUp(data) {
    const header = {
      "Device-Id": "777fgh",
      "Device-Type": "3",
      "Firebase-Token": "abcdef",
    };
    let res = await this.request(`/verify-otp`,
     data, "post", 
     header);

    return res;
  }

 
}

SublyApi.token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJEZXZpY2VJRCI6Ijc3N2ZnaCIsInVzZXJUeXBlIjoiMSIsImlhdCI6MTY0ODYyNDMzMCwiZXhwIjoxNjUxMjE2MzMwfQ.5ATTyFrpkG6_kGOJ9QnMQGBbB5sKz7KwfaPKOflhkgE";

export default SublyApi;
