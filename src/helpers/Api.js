import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
// const REACT_PROXYURL = "https://quiet-retreat-79741.herokuapp.com/";
const REACT_PROXYURL = "";

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
    "device-token": "abcd",
    "device-id": "777fgh",
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
    let res = await this.request(`/v1/guest-user-login`, undefined, "get");
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
    let res = await this.request(`/v1/request-otp`, data, "post");
    return res;
  }

  /* POST  /login api : { email, password }
    login api
     Authorization required:none
     @param data {Object} { email, password }
     @returns {object} {token}
     */
  static async loginProcess(data) {
    let res = await this.request(`/v1/login`, data, "post");
    return res;
  }

  /* POST  /request otp: { fullname ,email,password, confirm password}
     request otp
     Authorization required:none
     @param data {Object} {fullname ,email,password, confirm password}
     @returns {object} {token}
     */
  static async varifyOtp(data) {
    let res = await this.request(`/v1/verify-otp`, data, "post");

    return res;
  }

  /* POST  /forgot password api : { email }
    forgot password api
     
     Authorization required:none
     
     @param data {Object} { email }
     @returns {object} {token}
     */
  static async forgotPassword(data) {
    let res = await this.request(`/v1/forgote`, data, "post");

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
    let res = await this.request(`/v1/is-account-exist`, data, "post");
    return res;
  }

  /* POST  /social signup : {facebook}
    Social Signup
     Authorization required:none
     @param data {Object} { email }
     @returns {object} {token}
     */
  static async socialSignup(data) {
    let res = await this.request(`/v1/social-signup`, data, "post");
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
    let res = await this.request(`/v1/deal-list`, undefined, "get", header);

    return res;
  }

  /* GET  /Get user details: 
      Returns user detail
  
       Authorization required: Token
       @returns {object} {token}
       */
  static async userProfile(authToken) {
    let header = { "access-token": ` ${authToken}` };
    let res = await this.request(`/v1/user-detail`,
      undefined, undefined, header
    );

    return res;
  }

 /* GET  /verify google login: 
      Returns user detail
       Authorization required: none
       @returns {object} {}
       */
       static async verifyGoogleLogin(data) {
        let res = await this.request(`/v2/verify-google-login?access_token=${data}`,
        undefined, undefined
        );
    
        return res;
      }

      static async getClassiFiedMeta(token) {
        let header = { "access-token": ` ${token}` };
    
        let res = await this.request(`/get-meta-list`,
          "", "get",header
    );
    
        return res;
      }

}

// SublyApi.token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJEZXZpY2VJRCI6Ijc3N2ZnaCIsInVzZXJUeXBlIjoiMSIsImlhdCI6MTY0ODYyNDMzMCwiZXhwIjoxNjUxMjE2MzMwfQ.5ATTyFrpkG6_kGOJ9QnMQGBbB5sKz7KwfaPKOflhkgE";

export default SublyApi;
