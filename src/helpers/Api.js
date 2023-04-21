import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
// const REACT_PROXYURL = "https://quiet-retreat-79741.herokuapp.com/";
const REACT_PROXYURL = "";

// for making unique id for every browser
if (!localStorage.getItem("news_device_id")) {
  const uint32 = window.crypto.getRandomValues(new Uint32Array(1))[0];
  localStorage.setItem("news_device_id", uint32.toString(32));
}

// for making unique token for every browser
if (!localStorage.getItem("news_device_token")) {
  const uint32 = window.crypto.getRandomValues(new Uint32Array(1))[0];
  localStorage.setItem("news_device_token", uint32.toString(32));
}

/** API Class
 * static clase trying together method used to get/send to the API.
 * There shouldn't be any frontend-specific stuff here, and there  shouldn't be any API-aware stuff else hre in the frontend...
 */
class SublyApi {
  //token which interact with the API will be stored here.
  static token;

  //required common header for each api calling.
  static commonHeaders = {
    "api-key": process.env.REACT_APP_API_KEY_PAIR,
    "device-token": localStorage.getItem("news_device_token"),
    "device-id": localStorage.getItem("news_device_id"),
    "device-type": "3",
  };

  static async request(endpoint, data = {}, method = "get", header) {
    const url = `${REACT_PROXYURL}${BASE_URL}${endpoint}`;
    const headers = { ...SublyApi.commonHeaders, ...header };

    const params = method === "get" ? data : {};
    try {
      const result = await axios({ url, method, data, params, headers });
      return result ? result.data : "There is no return for this route";
    } catch (err) {
      return err.response;
    }
  }

  /******************************************************
   * USERS AUTH API ROUTES
   *******************************************************/

  /* ------guest login API -----*/
  /* GET  /request otp: { fullname ,email,password, confirm password}
     request otp
     Authorization required:none
     @param data {Object} {fullname ,email,password, confirm password}
     @returns {object} {token}
     */
  static async guestUserLogin() {
    let res = await this.request(`/v2/guest-user-login`, undefined, "get");
    return res;
  }

  /* ------SIGNUP API -----*/
  /* POST  /request otp: { fullname ,email,password, confirm password}
     request otp
     Authorization required:none
     @param data {Object} {fullname ,email,password, confirm password}
     @returns {object} {token}
     */
  static async requestOtp(data) {
    let res = await this.request(`/v2/request-otp`, data, "post");
    return res;
  }

  /* POST  /login api : { email, password }
    login api
     Authorization required:none
     @param data {Object} { email, password }
     @returns {object} {token}
     */
  static async loginProcess(data) {
    let res = await this.request(`/v2/login`, data, "post");
    return res;
  }

  /* POST  /request otp: { fullname ,email,password, confirm password}
     request otp
     Authorization required:none
     @param data {Object} {fullname ,email,password, confirm password}
     @returns {object} {token}
     */
  static async varifyOtp(data) {
    let res = await this.request(`/v2/verify-otp`, data, "post");

    return res;
  }

  /* POST  /forgot password api : { email }
    forgot password api
     
     Authorization required:none
     
     @param data {Object} { email }
     @returns {object} {token}
     */
  static async forgotPassword(data) {
    let res = await this.request(`/v2/forgote`, data, "post");

    return res;
  }

  /* POST  /check social login : {facebook}
    check social login
  /* GET  /deal list api : { email }
   deal list api
     
     Authorization required:none
     
     @param data {Object} { email }
     @returns {object} {token}
     */
  static async checkSocialLogin(data) {
    let res = await this.request(`/v2/is-account-exist`, data, "post");
    return res;
  }

  /* POST  /social signup : {facebook}
    Social Signup
     Authorization required:none
     @param data {Object} { email }
     @returns {object} {token}
     */
  static async socialSignup(data) {
    let res = await this.request(`/v2/social-signup`, data, "post");
    return res;
  }

  /* GET  /deal list api : { email }
   deal list api
     Authorization required:none
     @param data {Object} { email }
     @returns {object} {token}
     */
  static async getDealList(authToken) {
    let header = { "access-token": ` ${authToken}` };
    let res = await this.request(`/v2/deal-list`, undefined, "get", header);

    return res;
  }

  /* GET  /Get user details: 
      Returns user detail
  
       Authorization required: Token
       @returns {object} {token}
       */
  static async userProfile(authToken) {
    let header = { "access-token": ` ${authToken}` };
    let res = await this.request(
      `/v2/user-detail`,
      undefined,
      undefined,
      header
    );

    return res;
  }

  /* POST  /verify google login: {}
       Returns user detail
       Authorization required:none
       @param data {Object} {fullname ,email,password, confirm password}
       @returns {object} {token}
       */
  static async verifyGoogleLogin(data) {
    let res = await this.request(`/v2/verify-google-login`, data, "post");
    return res;
  }

  /* GET  /Get classified metalist: 
       Authorization required: Token
       @returns {object} {token}
       */
  static async getClassiFiedMeta(token) {
    let header = { "access-token": ` ${token}` };
    let res = await this.request(`/v2/get-meta-list`, "", "get", header);
    return res;
  }


  /* POST  /Update User Profile: 
      Update profile
  
       Authorization required: Token
       @returns {object} {token}
       */
  static async updateProfile(data, authToken) {
    let header = { "access-token": ` ${authToken}` };
    let res = await this.request(`/v2/update-profile`, data, "post", header);
    return res;
  }
}

// SublyApi.token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJEZXZpY2VJRCI6Ijc3N2ZnaCIsInVzZXJUeXBlIjoiMSIsImlhdCI6MTY0ODYyNDMzMCwiZXhwIjoxNjUxMjE2MzMwfQ.5ATTyFrpkG6_kGOJ9QnMQGBbB5sKz7KwfaPKOflhkgE";

export default SublyApi;
