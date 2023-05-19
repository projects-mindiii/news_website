import { Col, Container, Form, Modal, Row } from "react-bootstrap";
import "./Profile.css";
import { useEffect, useState } from "react";
import ProfileImg from "../../assets/images/profile.png";
import { MdAddCircleOutline } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { useForm } from "react-hook-form";
import { BsTrash3 } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import "react-phone-input-2/lib/style.css";
import SublyApi from "../../helpers/Api";
import { useDispatch, useSelector } from "react-redux";
import CustomBtn from "../../formComponent/Button/Button";
import Select from "react-select";
import { Toast } from "../../utils/Toaster";
import { STATUS_CODES } from "../../utils/StatusCode";
import { updateProfile, userDetails } from "../../store/slices/UserSlice";
import { useNavigate } from "react-router-dom";
import WatsappInput from "../../formComponent/CommonInputFields/WatsappInput";
import ContactInput from "../../formComponent/CommonInputFields/ContactInput";
import CommonEmailField from "../../formComponent/CommonInputFields/CommonEmailField";
import Loader from "../../utils/Loader/Loader";
import { userLogout } from "../../store/slices/UserSlice";
import DeleteAlertBox from "../DeleteAlertBox/DeleteAlertBox";
import NoteBoxModule from "../CommonModule/NoteBoxModule";

//--------Create a Profile component----------
function Profile() {
  const { userToken, allMetaList, isLoading } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //set language
  const { t } = useTranslation();
  const [phoneNo, setPhoneNo] = useState("");
  const [dialCode, setDialCode] = useState("27");
  const [countryCode, setCountryCode] = useState("za");
  const [watsappNo, setWatsappNo] = useState("");
  const [dialCodeWatsapp, setDialCodeWatsapp] = useState("27");
  const [countryCodeWatsapp, setCountryCodeWatsapp] = useState("za");
  const [profilePreview, setProfilePreview] = useState(ProfileImg);
  const [profileImage, setProfileImage] = useState("");
  const locationOption = [
    { value: 1, label: "South Africa", id: 1 },
    { value: 0, label: "Outside South Africa", id: 0 },
  ];
  const [locationSelected, setLocationSelected] = useState({
    value: 1,
    label: "South Africa",
    id: 1,
  });
  const [countryOption, setCountryOption] = useState([
    {
      label: "Set Country",
      value: "0",
      id: "0",
    },
  ]);
  const [countrySelected, setCountrySelected] = useState({
    label: "Set Country",
    value: "0",
    id: "0",
  });
  const [provinceOption, setProvinceOption] = useState([
    {
      label: "Select Province",
      value: "0",
      id: "0",
    },
  ]);
  const [provinceSelected, setProvinceSelected] = useState({
    label: "Select Province",
    value: "0",
    id: "0",
  });

  const [changePassword, setChangePassword] = useState(0);
  const [isPassword, setIsPassword] = useState("");

  //----- state for manage show/hide modal-----
  const [showPopup, setShowPopup] = useState(false);

  //----- for close modal-----
  const handleClose = () => setShowPopup(false);
  //----- for show modal-----
  const handleShow = () => setShowPopup(true);

  //----- function for Upload update profile image-----
  function onImageChange(e) {
    if (e.target.files.length !== 0) {
      setProfilePreview(URL.createObjectURL(e.target.files[0]));
      setProfileImage(e.target.files[0]);
    }
  }

  //----- function for remove profile image-----
  function onImageRemove() {
    setProfilePreview(ProfileImg);
    setProfileImage("");
  }

  //----------function for form validation using useform------------
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  //-------function for get profile Api-------
  useEffect(() => {
    let countryOptions = [];
    let provinceOptions = [];
    async function getMetaDetails() {
      if (Object.keys(allMetaList).length > 0) {
        await allMetaList.countries.map((item) => {
          countryOptions.push({
            label: item.name,
            value: item.id,
            id: item.id,
          });
        }); //getting selection option in array as country list
        await setCountryOption(countryOptions);

        await allMetaList.provinces.map((item) => {
          provinceOptions.push({
            label: item.name,
            value: item.id,
            id: item.id,
          });
        }); //getting selection option in array as province list

        await setProvinceOption(provinceOptions);
      }
    }
    getMetaDetails();

    dispatch(userDetails(userToken)).then((responsejson) => {
      const response = responsejson.payload;
      if (response.status_code === STATUS_CODES.SUCCESS) {
        setValue(
          "fullName",
          response.data[0].name ? response.data[0].name : ""
        );
        setValue("email", response.data[0].email ? response.data[0].email : "");
        setValue(
          "companyName",
          response.data[0].company_name ? response.data[0].company_name : ""
        );
        setValue(
          "occupation",
          response.data[0].occupation ? response.data[0].occupation : ""
        );
        setValue("city", response.data[0].city ? response.data[0].city : "");
        setDialCode(
          response.data[0].dial_code ? response.data[0].dial_code : dialCode
        );
        setCountryCode(
          response.data[0].country_code
            ? response.data[0].country_code
            : countryCode
        );
        setPhoneNo(response.data[0].contact ? response.data[0].contact : "");
        setWatsappNo(
          response.data[0].whatapp_contact_number
            ? response.data[0].whatapp_contact_number
            : ""
        );
        setCountryCodeWatsapp(
          response.data[0].whatsapp_country_code
            ? response.data[0].whatsapp_country_code
            : countryCodeWatsapp
        );
        setDialCodeWatsapp(
          response.data[0].whatsapp_dail_code
            ? response.data[0].whatsapp_dail_code
            : dialCodeWatsapp
        );
        setProfilePreview(
          response.data[0].img_url ? response.data[0].img_url : profilePreview
        );
        setIsPassword(
          response.data[0].password ? response.data[0].password : ""
        );
        const newLocationOption = locationOption.find(
          (item) => item.id === response.data[0].is_default_country
        );
        setLocationSelected(newLocationOption);
        const newCountryOption = countryOptions.find(
          (item) => item.id === response.data[0].country_id
        );
        setCountrySelected(newCountryOption);
        const newProvinceOption = provinceOptions.find(
          (item) => item.id === response.data[0].provinces
        );
        setProvinceSelected(newProvinceOption);
      } else if (response.status === STATUS_CODES.INVALID_TOKEN) {
        Toast.fire({
          icon: "error",
          title: t("SESSION_EXPIRE"),
        });
        dispatch(userLogout());
        navigate("/login");
      } else {
        Toast.fire({
          icon: "error",
          title: response.data.message,
        });
      }
    });
  }, []);

  //-----------function for update profile api-----------
  const onSubmit = async (formdata) => {
    let requestData = new FormData();
    requestData.append("name", formdata ? formdata.fullName : "");
    requestData.append("email", formdata ? formdata.email : "");
    requestData.append("company_name", formdata ? formdata.companyName : "");
    requestData.append("occupation", formdata ? formdata.occupation : "");
    requestData.append("city", formdata ? formdata.city : "");
    requestData.append("dial_code", dialCode);
    requestData.append("country_code", countryCode);
    requestData.append("contact", phoneNo);
    requestData.append("whatsapp_dail_code", dialCodeWatsapp);
    requestData.append("whatsapp_country_code", countryCodeWatsapp);
    requestData.append("whatapp_contact_number", watsappNo);
    requestData.append(
      "country_id",
      countrySelected ? countrySelected.value : ""
    );
    requestData.append(
      "provinces",
      provinceSelected ? provinceSelected.value : ""
    );
    requestData.append(
      "is_default_country",
      locationSelected ? locationSelected.value : ""
    );
    requestData.append("image", profileImage);
    requestData.append("is_password_change", changePassword);
    requestData.append(
      "current_password",
      formdata ? formdata.currentPassword : ""
    );
    requestData.append("new_passsword", formdata ? formdata.setPassword : "");
    const data = { requestData: requestData, userToken: userToken };
    dispatch(updateProfile(data)).then((responsejson) => {
      const response = responsejson.payload;
      if (response.status_code === STATUS_CODES.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: response.message,
        });
      } else if (response.status === STATUS_CODES.INVALID_TOKEN) {
        Toast.fire({
          icon: "error",
          title: t("SESSION_EXPIRE"),
        });
        dispatch(userLogout());
        navigate("/login");
      } else {
        Toast.fire({
          icon: "error",
          title: response.data.message,
        });
      }
    });
  };

  //------ function for delete user API -------
  async function deleteUser() {
    const response = await SublyApi.deleteUserProfile(userToken);
    if (response.status_code === STATUS_CODES.SUCCESS) {
      Toast.fire({
        icon: "success",
        title: response.message,
      });
      handleClose();
      navigate("/login-form");
    } else if (response.status === STATUS_CODES.INVALID_TOKEN) {
      Toast.fire({
        icon: "error",
        title: t("SESSION_EXPIRE"),
      });
      dispatch(userLogout());
      navigate("/login");
    } else {
      Toast.fire({
        icon: "error",
        title: response.data.message,
      });
    }
  }

  return (
    <>
      {isLoading === true ? <Loader /> : ""}
      <div className="main">
        <Container>
          <div className="profile">
            <Row>
              <Col xs={12} sm={12} md={12} lg={6}>
                <NoteBoxModule
                  headText={t("YOUR_PROFILE")}
                  headSubText={t("NOTE")}
                  detailText={t("PROFILE_DETAILS")}
                />
              </Col>
              <Col xs={12} sm={12} md={12} lg={6}>
                <div className="profileRightPart">
                  <h4>{t("YOUR_PROFILE")}</h4>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <h3>{t("PROFILE")}</h3>
                    <p>{t("PROFILE_PARA")}</p>
                    <Form.Group className="mb-3" controlId="formBasicName">
                      <Form.Control
                        type="text"
                        placeholder={t("NAME")}
                        {...register("fullName", {
                          required: {
                            value: true,
                            message: `${t("ENTER_NAME")}`,
                          },
                        })}
                      />
                    </Form.Group>
                    {errors.fullName && (
                      <span className="errorDisplay">
                        {errors.fullName.message}
                      </span>
                    )}

                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder={t("COMPANY_NAME")}
                        {...register("companyName")}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder={t("POSITION")}
                        {...register("occupation")}
                      />
                    </Form.Group>
                    <CommonEmailField register={register} />

                    {errors.email && (
                      <span className="errorDisplay">
                        {errors.email.message}
                      </span>
                    )}

                    {/* phone number input */}
                    <ContactInput
                      phone={phoneNo}
                      dialCode={dialCode}
                      country={countryCode}
                      phone1={setPhoneNo}
                      dialCode1={setDialCode}
                      country1={setCountryCode}
                    />

                    {/* watsapp number input */}
                    <WatsappInput
                      watsappNo={watsappNo}
                      dialCodeWatsapp={dialCodeWatsapp}
                      countryCodeWatsapp={countryCodeWatsapp}
                      setWatsappNo={setWatsappNo}
                      setDialCodeWatsapp={setDialCodeWatsapp}
                      setCountryCodeWatsapp={setCountryCodeWatsapp}
                    />

                    <h3>{t("LOCATION")}</h3>
                    <p>{t("LOCATION_PARA")}</p>
                    <div className="selectOption">
                      <Form.Group className="mb-3">
                        <Select
                          id="location"
                          name="location"
                          options={locationOption}
                          onChange={setLocationSelected}
                          value={locationSelected}
                          styles={{
                            placeholder: () => ({
                              fontSize: "15px",
                              color: "#cacaca",
                              position: "absolute",
                              top: "8px",
                              left: "15px",
                            }),
                          }}
                          theme={(theme) => ({
                            ...theme,
                            colors: {
                              ...theme.colors,
                              borderRadius: 0,
                              primary25: "#f2f2f2",
                              primary: "#000000;",
                              primary50: "#f2f2f2",
                            },
                          })}
                        />
                      </Form.Group>
                    </div>

                    <div
                      className={`${locationSelected.value == 1
                        ? "selectOption hideIcon"
                        : "selectOption"
                        }`}
                    >
                      <Form.Group className="mb-3">
                        <Select
                          id="country"
                          options={countryOption}
                          onChange={setCountrySelected}
                          placeholder={t("COUNTRY_SET")}
                          value={countrySelected}
                          styles={{
                            placeholder: () => ({
                              fontSize: "15px",
                              color: "#cacaca",
                              position: "absolute",
                              top: "8px",
                              left: "15px",
                            }),
                          }}
                          theme={(theme) => ({
                            ...theme,
                            colors: {
                              ...theme.colors,
                              borderRadius: 0,
                              primary25: "#f2f2f2",
                              primary: "#000000;",
                              primary50: "#f2f2f2",
                            },
                          })}
                        />
                      </Form.Group>
                    </div>

                    <div
                      className={`${locationSelected.value == 0
                        ? "selectOption hideIcon"
                        : "selectOption"
                        }`}
                    >
                      <Form.Group className="mb-3">
                        <Select
                          id="province"
                          options={provinceOption}
                          onChange={setProvinceSelected}
                          placeholder={t("SELECT_PROVINCE")}
                          value={provinceSelected}
                          styles={{
                            placeholder: () => ({
                              fontSize: "15px",
                              color: "#cacaca",
                              position: "absolute",
                              top: "8px",
                              left: "15px",
                            }),
                          }}
                          theme={(theme) => ({
                            ...theme,
                            colors: {
                              ...theme.colors,
                              borderRadius: 0,
                              primary25: "#f2f2f2",
                              primary: "#000000;",
                              primary50: "#f2f2f2",
                            },
                          })}
                        />
                      </Form.Group>
                    </div>

                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder={t("CITY")}
                        {...register("city")}
                      />
                    </Form.Group>

                    <h3>{t("PROFILE_PHOTO")}</h3>
                    <p>{t("ADD_PHOTO")}</p>
                    <div className="profileImg ">
                      <div className="profileIcon">
                        <label for="uploadImage">
                          <MdAddCircleOutline />
                        </label>
                        <h6 className="addCls">{t("ADD")}</h6>
                      </div>
                      <div className="profileImageSet">
                        <img src={profilePreview} />
                        <input
                          id="uploadImage"
                          name="image"
                          type="file"
                          style={{
                            display: "none",
                          }}
                          accept="image/*"
                          onChange={onImageChange}
                        />
                      </div>
                      <div className="profileIcon">
                        <MdOutlineCancel onClick={(e) => onImageRemove(e)} />
                        <h6 className="addCls">{t("CLEAR")}</h6>
                      </div>
                    </div>

                    <h3>{t("YOUR_PASSWORD")}</h3>
                    <p>{t("PASSWORD_PARA")}</p>
                    <div className="hidePassword">{isPassword}</div>

                    <div className="changePassword">
                      <div className="changeIcon">
                        <h6>{t("CHANGE_PASSWORD")}</h6>
                        {changePassword == 0 ? (
                          <MdKeyboardArrowDown
                            onClick={() => setChangePassword(1)}
                          />
                        ) : (
                          <MdKeyboardArrowUp
                            onClick={() => setChangePassword(0)}
                          />
                        )}
                      </div>

                      {changePassword == 1 && (
                        <div>
                          <Form.Group className="mb-3">
                            <Form.Control
                              type="password"
                              placeholder={t("CURRENT_PASSWORD")}
                              {...register("currentPassword", {
                                required: {
                                  value: true,
                                  message: `${t("CURRENT_PASS")}`,
                                },
                                pattern: {
                                  value:
                                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
                                  message: `${t("INVALID_PASSWORD")}`,
                                },
                              })}
                            />
                          </Form.Group>
                          {errors.currentPassword && (
                            <span className="errorDisplay">
                              {errors.currentPassword.message}
                            </span>
                          )}
                          <Form.Group className="mb-3">
                            <Form.Control
                              type="password"
                              placeholder={t("SET_PASSWORD")}
                              {...register("setPassword", {
                                required: {
                                  value: true,
                                  message: `${t("NEW_PASSWORD")}`,
                                },
                                pattern: {
                                  value:
                                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
                                  message: `${t("INVALID_PASSWORD")}`,
                                },
                              })}
                            />
                          </Form.Group>
                          {errors.setPassword && (
                            <span className="errorDisplay">
                              {errors.setPassword.message}
                            </span>
                          )}
                          <Form.Group className="mb-3">
                            <Form.Control
                              type="password"
                              placeholder={t("REPEAT_PASSWORD")}
                              {...register("repeatPassword", {
                                required: {
                                  value: true,
                                  message: `${t("REPEAT_PASS")}`,
                                },

                                validate: (value) =>
                                  value === watch("setPassword") ||
                                  `${t("NOT_MATCH")}`,
                              })}
                            />
                          </Form.Group>
                          {errors.repeatPassword && (
                            <span className="errorDisplay">
                              {errors.repeatPassword.message}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="buttonAdd">
                      <CustomBtn>{t("SAVE")}</CustomBtn>
                    </div>
                  </Form>

                  <div className="deleteIcon" onClick={handleShow}>
                    <BsTrash3 />
                    <h6>{t("DELETE_ACCOUNT")}</h6>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
        <DeleteAlertBox
          handleClose={handleClose}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
          deleteHandle={deleteUser}
          alertText={t("WANT_DELETE")}
        />
      </div>
    </>
  );
}
export default Profile;
