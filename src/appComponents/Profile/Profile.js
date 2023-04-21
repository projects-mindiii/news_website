import { Col, Container, Form, Modal, Row } from "react-bootstrap";
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
import { useDispatch, useSelector } from "react-redux";
import CustomBtn from "../../formComponent/Button/Button";
import Select from "react-select";
import { Toast } from "../../utils/Toaster";
import { STATUS_CODES } from "../../utils/StatusCode";
import { updateProfile, userDetails } from "../../store/slices/UserSlice";
import { useNavigate } from "react-router-dom";


//--------Create a Profile component----------
function Profile() {
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
    const { userToken } = useSelector((state) => state.user);
    const [metaData, setMetaData] = useState("");
    const locationOption = [
        { value: 1, label: "South Africa", id: 1 },
        { value: 2, label: "Outside South Africa", id: 2 },
    ];
    const [locationSelected, setLocationSelected] = useState(1);
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

    //-------function for get country list Api-------
    useEffect(() => {
        async function getMetaDetails() {
            const details = await SublyApi.getClassiFiedMeta(userToken); //get country and province list

            if (details.status_code === STATUS_CODES.SUCCESS) {
                let countryOptions = [];
                await details.data.countries.map((item) => {
                    countryOptions.push({
                        label: item.name,
                        value: item.id,
                        id: item.id,
                    });
                }); //getting selection option in array as country list
                await setCountryOption(countryOptions);

                let provinceOptions = [];
                await details.data.provinces.map((item) => {
                    provinceOptions.push({
                        label: item.name,
                        value: item.id,
                        id: item.id,
                    });
                }); //getting selection option in array as province list
                await setProvinceOption(provinceOptions);

                setMetaData(details.data);
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

    //-------function for get profile Api-------
    useEffect(() => {
        dispatch(userDetails(userToken)).then((responsejson) => {
            const response = responsejson.payload;
            if (response.status_code === STATUS_CODES.SUCCESS) {
                setValue("fullName", (response.data[0].name) ? response.data[0].name : "");
                setValue("email", (response.data[0].email) ? response.data[0].email : "");
                setValue("companyName", (response.data[0].company_name) ? response.data[0].company_name : "");
                setValue("occupation", (response.data[0].occupation) ? response.data[0].occupation : "");
                setValue("city", (response.data[0].city) ? response.data[0].city : "");
                setDialCode((response.data[0].dial_code) ? response.data[0].dial_code : dialCode);
                setCountryCode((response.data[0].country_code) ? response.data[0].country_code : countryCode);
                setPhoneNo((response.data[0].contact) ? response.data[0].contact : "");
                setWatsappNo((response.data[0].whatapp_contact_number) ? response.data[0].whatapp_contact_number : "");
                setCountryCodeWatsapp((response.data[0].whatsapp_country_code) ? response.data[0].whatsapp_country_code : countryCodeWatsapp);
                setDialCodeWatsapp((response.data[0].whatsapp_dail_code) ? response.data[0].whatsapp_dail_code : dialCodeWatsapp);
                setProfilePreview((response.data[0].img_url) ? response.data[0].img_url : "");
                setIsPassword((response.data[0].password) ? response.data[0].password : "");

                const newOption = locationOption.find(item => item.id === response.data[0].is_default_country);
               

                setLocationSelected({ value: 2, label: "Outside South Africa", id: 2 });

                // setCountryOption((response.data[0].country_id) ? response.data[0].country_id : "")
                // setProvinceOption((response.data[0].provinces) ? response.data[0].provinces : "")
                // setCountrySelected((response.data[0].country_id) ? response.data[0].country_id : "")
                // setProvinceSelected((response.data[0].provinces) ? response.data[0].provinces : "")
            } else {
                Toast.fire({
                    icon: "error",
                    title: response.data.message,
                });
            }
        })
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
        requestData.append("country_id", countryOption);
        requestData.append("provinces", provinceOption);
        console.log('locationSelected', locationSelected)
        console.log('locationSelected value', locationSelected.value)

        requestData.append("is_default_country", locationSelected.value);


        requestData.append("image", profileImage);
        requestData.append("is_password_change", changePassword);
        requestData.append("current_password", formdata.setPassword);
        requestData.append("new_passsword", formdata.repeatPassword);


        const data = { 'requestData': requestData, "userToken": userToken };
        dispatch(updateProfile(data)).then((responsejson) => {
            const response = responsejson.payload;
            if (response.status_code === STATUS_CODES.SUCCESS) {
                Toast.fire({
                    icon: "success",
                    title: response.message,
                });
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
            navigate("/login-form");
        } else {
            Toast.fire({
                icon: "error",
                title: response.data.message,
            });
        }
    }

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
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Control
                                            type="text"
                                            placeholder={t("POSITION")}
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
                                                id="location" name="location"
                                                options={locationOption}
                                                onChange={setLocationSelected}
                                                // onChange={(value) => setLocationSelected(value.id)}
                                                // placeholder="South Africa"
                                                // maxMenuHeight={220}
                                                // menuPlacement="auto"
                                                defaultValue={locationSelected}
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

                                    <div className={`${locationSelected.value == 1 ? "selectOption hideIcon" : "selectOption"}`}>
                                        <Form.Group className="mb-3" >
                                            <Select
                                                id="country"
                                                options={countryOption ? countryOption : {}}
                                                onChange={(value) => setCountrySelected(value)}
                                                placeholder="Country Set"
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

                                    <div className={`${locationSelected.value == 0 ? "selectOption hideIcon" : "selectOption"}`}>
                                        <Form.Group className="mb-3" >
                                            <Select
                                                id="province"
                                                options={provinceOption ? provinceOption : {}}
                                                onChange={(value) => setProvinceSelected(value)}
                                                placeholder="Province"
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
                                            placeholder={t("CITY")}
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
                                    <div className="hidePassword">
                                        {isPassword}
                                    </div>

                                    <div className="changePassword">
                                        <div className="changeIcon">
                                            <h6>{t("CHANGE_PASSWORD")}</h6>
                                            {changePassword == 0 ? <MdKeyboardArrowDown onClick={() => setChangePassword(1)} /> : <MdKeyboardArrowUp onClick={() => setChangePassword(0)} />}
                                        </div>

                                        {changePassword == 1 &&
                                            <div>
                                                <Form.Group className="mb-3">
                                                    <Form.Control
                                                        type="password"
                                                        placeholder="Current Password"
                                                        {...register("password", {
                                                            required: {
                                                                value: true,
                                                                message: "Please Enter password"
                                                            },
                                                            pattern: {
                                                                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
                                                                message: `${t("INVALID_PASSWORD")}`,
                                                            },
                                                        })}
                                                    />
                                                </Form.Group>
                                                {errors.password && (
                                                    <span className="errorDisplay">
                                                        {errors.password.message}
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
                                                                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
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

                                                            // validate: (value) =>
                                                            //     value === watch("setPassword") || `${t("NOT_MATCH")}`,
                                                        })}
                                                    />
                                                </Form.Group>
                                                {errors.repeatPassword && (
                                                    <span className="errorDisplay">
                                                        {errors.repeatPassword.message}
                                                    </span>
                                                )}
                                            </div>
                                        }

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
                </div >
            </Container >

            <Modal
                show={showPopup}
                onHide={handleClose}
                className="deletePopup"
                keyboard={false}
                backdrop="static">
                <Modal.Header>
                    <Modal.Title>{t("ALERT")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{t("WANT_DELETE")}</Modal.Body>
                <Modal.Footer>
                    <div className="buttonAdd1">
                        <CustomBtn type="button" onClick={handleClose}>{t("CANCEL")}</CustomBtn>
                    </div>
                    <div>
                        <CustomBtn onClick={() => { deleteUser(); handleClose() }}>{t("DELETE")}</CustomBtn>
                    </div>
                </Modal.Footer>
            </Modal>
        </div >

    );
}
export default Profile;