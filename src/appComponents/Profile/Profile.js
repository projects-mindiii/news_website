import { Col, Container, Form, Row } from "react-bootstrap";
import "./Profile.css";
import { AiOutlineMail } from "react-icons/ai";
import { useEffect, useState } from "react";
import ProfileImg from "../../assets/images/profile.png"
import { MdAddCircleOutline } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { useForm } from "react-hook-form";
import { BsTrash3 } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import { MdPhonelinkRing } from "react-icons/md";
import { BsWhatsapp } from "react-icons/bs";
import SublyApi from "../../helpers/Api";
import { useSelector } from "react-redux";
import CustomBtn from "../../formComponent/Button/Button";
import Select from "react-select";
import { Toast } from "../../utils/Toaster";
import { STATUS_CODES } from "../../utils/StatusCode";


//--------Create a Profile component----------
function Profile() {
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
    //----- set state for show alert box for error response------
    const [showError, setShowError] = useState(null);
    //----- state for manage show/hide change password inputs fields-----
    const [show, setShow] = useState(false);
    const [userDetails, setUserDetails] = useState("");
    const { userToken } = useSelector((state) => state.user);
    const [metaData, setMetaData] = useState("");
    const locationOption = [
        { value: "204", label: "South Africa", id: "204" },
        { value: "0", label: "Outside South Africa", id: "0" },
    ];
    const [locationSelected, setLocationSelected] = useState(204);
    const [countryOption, setCountryOption] = useState([
        {
            label: "Set Country",
            value: "0",
            id: "0",
        },
    ]);
    const [countrySelected, setCountrySelected] = useState("");
    const [provinceOption, setProvinceOption] = useState([
        {
            label: "Province",
            value: "0",
            id: "0",
        },
    ]);
    const [provinceSelected, setProvinceSelected] = useState("");

    //----- function for Upload update profile image-----
    function onImageChange(e) {
        if (e.target.files.length !== 0) {
            setProfilePreview(URL.createObjectURL(e.target.files[0]));
            setProfileImage(e.target.files[0]);
        }
    }

    //----------function for form validation using useform------------
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm();

    //-------function for get country list Api-------
    useEffect(() => {
        async function getMetaDetails() {
            const details = await SublyApi.getClassiFiedMeta(userToken); //profile api call
            if (details.status_code === STATUS_CODES.SUCCESS) {
                setMetaData(details.data);
                setCountryOption(details.data.countries);
                setProvinceOption(details.data.provinces);
            }
            else {
                Toast.fire({
                    icon: "error",
                    title: details.data.message,
                });
            }
        }
        getMetaDetails();
    }, []);

    //-------function for profile Api-------
    useEffect(() => {
        async function getUserDetails() {
            const details = await SublyApi.userProfile(userToken); //profile api call
            if (details.status_code === STATUS_CODES.SUCCESS) {
                setUserDetails(details.data);
                setValue("fullName", details.data[0].name);
                setValue("email", details.data[0].email);
                setValue("companyName", details.data[0].company_name);
                setValue("occupation", details.data[0].occupation);
                setValue("city", details.data[0].city);
                setDialCode(details.data[0].dial_code);
                setCountryCode(details.data[0].country_code);
                setPhoneNo(details.data[0].contact);
                setWatsappNo(details.data[0].whatapp_contact_number);
                setCountryCodeWatsapp(details.data[0].whatsapp_country_code);
                setDialCodeWatsapp(details.data[0].whatsapp_dail_code);
                setProfilePreview(details.data[0].img_url);
                // setCountryOption(details.data[0].country_id)
                // setProvinceOption(details.data[0].provinces)
                setCountrySelected(details.data[0].country_id)
                setProvinceSelected(details.data[0].provinces)
            } else {
                Toast.fire({
                    icon: "error",
                    title: details.data.message,
                });
            }
        }
        getUserDetails();
    }, []);

    //-----------function for update profile api-----------
    const onSubmit = async (formdata) => {
        let requestData = new FormData();
        requestData.append("name", formdata.fullName);
        requestData.append("email", formdata.email);
        requestData.append("company_name", formdata.companyName);
        requestData.append("occupation", formdata.occupation);
        requestData.append("city", formdata.city);
        requestData.append("dial_code", dialCode);
        requestData.append("country_code", countryCode);
        requestData.append("contact", phoneNo);
        requestData.append("whatsapp_dail_code", dialCodeWatsapp);
        requestData.append("whatsapp_country_code", countryCodeWatsapp);
        requestData.append("whatapp_contact_number", watsappNo);
        await SublyApi.updateProfile(requestData,userToken).then((responsejson) => {
            if (responsejson.status_code === STATUS_CODES.SUCCESS) {
                Toast.fire({
                    icon: "success",
                    title: responsejson.message,
                });
            } else {
                Toast.fire({
                    icon: "error",
                    title: responsejson.data.message,
                });
            }
        });
    };

    return (
        <div className="main">
            <Container>
                <div className="profile">
                    <Row>
                        <Col sm={6}>
                            <div className="profileLeftPart">
                                <h3>{t("YOUR_PROFILE")}</h3>
                                <p><strong>{t("NOTE")}</strong>
                                    {t("PROFILE_DETAILS")}
                                </p>
                            </div>
                        </Col>
                        <Col sm={6}>
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
                                            {...register("companyName"

                                            )}
                                            {...register("companyName"

                                            )}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Control
                                            type="text"
                                            placeholder={t("POSITION")}
                                            {...register("occupation"

                                            )}
                                            {...register("occupation"

                                            )}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3 emailSet">
                                        <Form.Control
                                            type="text"
                                            placeholder={t("EMAIL")}
                                            {...register("email", {
                                                required: {
                                                    value: true,
                                                    message: `${t("ENTER_EMAIL")}`,
                                                },
                                                pattern: {
                                                    value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                    message: `${t("INVALID_EMAIL")}`,
                                                },
                                            })}
                                        />
                                        <AiOutlineMail />
                                    </Form.Group>
                                    {errors.email && (
                                        <span className="errorDisplay">
                                            {errors.email.message}
                                        </span>
                                    )}

                                    {/* phone number input */}
                                    <div className="phoneInputSet">
                                        <MdPhonelinkRing />
                                        <p>{countryCode.toUpperCase()} + {dialCode.toString()}</p>
                                        <PhoneInput
                                            country={"za"}
                                            value={dialCode.toString() +
                                                phoneNo.toString()}
                                            onChange={(value, country) => {
                                                let dialCode = country.dialCode;
                                                let phone = value.slice(
                                                    dialCode.length,
                                                    value.length
                                                );
                                                setCountryCode(country.countryCode)
                                                setDialCode(dialCode);
                                                setPhoneNo(phone);

                                            }}
                                            countryCodeEditable={false}
                                            copyNumbersOnly={true}
                                        />
                                    </div>

                                    {/* watsapp number input */}
                                    <div className="phoneInputSet watsappInput">
                                        <BsWhatsapp />
                                        <p>{countryCodeWatsapp.toUpperCase()} + {dialCodeWatsapp.toString()}</p>
                                        <PhoneInput
                                            country={"za"}
                                            value={dialCodeWatsapp.toString() +
                                                watsappNo.toString()}
                                            onChange={(value, country) => {
                                                let dialCode = country.dialCode;
                                                let phone = value.slice(
                                                    dialCode.length,
                                                    value.length
                                                );
                                                setCountryCodeWatsapp(country.countryCode)
                                                setDialCodeWatsapp(dialCode);
                                                setWatsappNo(phone);

                                            }}
                                            countryCodeEditable={false}
                                            copyNumbersOnly={true}
                                        />
                                    </div>

                                    <h3>{t("LOCATION")}</h3>
                                    <p>{t("LOCATION_PARA")}</p>
                                    <div className="selectOption">
                                        <Form.Group className="mb-3">
                                            <Select
                                                id="status"
                                                options={locationOption ? locationOption : {}}
                                                onChange={(value) => setLocationSelected(value.id)}
                                                placeholder="South Africa"
                                                // maxMenuHeight={220}
                                                // menuPlacement="auto"
                                                defaultValue={locationOption[0]}
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

                                    <div className={`${locationSelected == 204 ? "selectOption hideIcon" : "selectOption"}`}>
                                        <Form.Group className="mb-3" >
                                            <Select
                                                id="status"
                                                options={countryOption ? countryOption : {}}
                                                // onChange={(e) => handleChange(e)}
                                                onChange={(value) => setCountrySelected(value)}
                                                placeholder="South Africa"
                                                maxMenuHeight={220}
                                                menuPlacement="auto"
                                                defaultValue={countryOption[0]}
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

                                    <div className={`${locationSelected == 0 ? "selectOption hideIcon" : "selectOption"}`}>
                                        <Form.Group className="mb-3" >
                                            <Select
                                                id="status"
                                                options={provinceOption ? provinceOption : {}}
                                                onChange={(value) => setProvinceSelected(value)}
                                                placeholder="South Africa"
                                                maxMenuHeight={220}
                                                menuPlacement="auto"
                                                defaultValue={provinceOption[0]}
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
                                            placeholder="Input City/Town"
                                            {...register("city"

                                            )}
                                            {...register("city"

                                            )}
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
                                                type="file"
                                                style={{
                                                    display: "none",
                                                }}
                                                accept="image/*"
                                                onChange={onImageChange}
                                            />
                                        </div>
                                        <div className="profileIcon">
                                            <MdOutlineCancel />
                                            <h6 className="addCls">{t("CLEAR")}</h6>
                                        </div>
                                    </div>

                                    <h3>{t("YOUR_PASSWORD")}</h3>
                                    <p>{t("PASSWORD_PARA")}</p>
                                    <div className="hidePassword">
                                        *****H12
                                    </div>
                                    <div className="changePassword">
                                        {show ? (
                                            <div className="changeIcon" onClick={() => setShow(!show)}>
                                                <h6>{t("CHANGE_PASSWORD")}</h6>
                                                < MdKeyboardArrowUp />
                                            </div>

                                        ) : (
                                            <div className="changeIcon" onClick={() => setShow(!show)}>
                                                <h6>{t("CHANGE_PASSWORD")}</h6>
                                                <MdKeyboardArrowDown />
                                            </div>
                                        )}
                                        {show == true ? (
                                            <div>
                                                <Form.Group className="mb-3">
                                                    <Form.Control
                                                        type="password"
                                                        placeholder="Set New Password"
                                                        {...register("password", {
                                                            required: {
                                                                value: true,
                                                                message: `Please Enter Password`,
                                                            },
                                                            pattern: {
                                                                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
                                                                message: `${t("INVALID_PASSWORD")}`,
                                                            },
                                                        })}
                                                        {...register("password", {
                                                            required: {
                                                                value: true,
                                                                message: `Please Enter Password`,
                                                            },
                                                            pattern: {
                                                                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
                                                                message: `${t("INVALID_PASSWORD")}`,
                                                            },
                                                        })}
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <Form.Control
                                                        type="password"
                                                        placeholder="Repeat Password"
                                                        {...register("repeatPassword", {
                                                            required: {
                                                                value: true,
                                                                message: `Please Enter Repeat Password`,
                                                            },

                                                            validate: (value) =>
                                                                value === watch("password") || "Passwords have to match",
                                                        })}
                                                        {...register("repeatPassword", {
                                                            required: {
                                                                value: true,
                                                                message: `Please Enter Repeat Password`,
                                                            },

                                                            validate: (value) =>
                                                                value === watch("password") || "Passwords have to match",
                                                        })}
                                                    />
                                                </Form.Group>
                                                <div className="errorSet">
                                                    <span className="errorShow">
                                                        {errors[Object.keys(errors)[0]] &&
                                                            errors[Object.keys(errors)[0]].message}{" "}
                                                    </span>
                                                </div>
                                                <div className="errorSet">
                                                    <span className="errorShow">
                                                        {errors[Object.keys(errors)[0]] &&
                                                            errors[Object.keys(errors)[0]].message}{" "}
                                                    </span>
                                                </div>
                                            </div>
                                        ) : ""}
                                    </div>
                                    <div className="buttonAdd">
                                        <CustomBtn>{t("SAVE")}</CustomBtn>
                                    </div>
                                </Form>

                                <div className="deleteIcon">
                                    <BsTrash3 />
                                    <h6>{t("DELETE_ACCOUNT")}</h6>
                                </div>

                            </div>
                        </Col>
                    </Row>
                </div >
            </Container >
        </div >
    );
}
export default Profile;