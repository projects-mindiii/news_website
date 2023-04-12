import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "./Profile.css";
import { AiOutlineMail } from "react-icons/ai";
import { useState } from "react";
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


//--------Create a Profile component----------
function Profile() {
    //set language
    const { t } = useTranslation();
    const [profilePreview, setProfilePreview] = useState(ProfileImg);
    const [profileImage, setProfileImage] = useState("");
    //----- state for manage show/hide change password inputs fields-----
    const [show, setShow] = useState(false);
    const [phoneNo, setPhoneNo] = useState("");
    const [dialCode, setDialCode] = useState("27");
    const [countryCode, setCountryCode] = useState("za");

    //----- function for Upload update profile image-----
    function onImageChange(e) {
        if (e.target.files.length !== 0) {
            setProfilePreview(URL.createObjectURL(e.target.files[0]));
            setProfileImage(e.target.files[0]);
        }
    }

    //----------function for form validation using useform------------
    const {
        handleSubmit,
    } = useForm();

    //-----------function for save profile details-----------
    const onSubmit = () => {

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
                                    <Form.Group className="mb-3">
                                        <Form.Control
                                            type="text"
                                            placeholder="Full Name"
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Control
                                            type="text"
                                            placeholder="Company Name (Optional)"
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Control
                                            type="text"
                                            placeholder="Position/Occupation (Optional)"
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3 emailSet">
                                        <Form.Control
                                            type="text"
                                            placeholder="EMAIL"
                                        />
                                        <AiOutlineMail />
                                    </Form.Group>

                                    {/* phone input */}
                                    <div className="phoneInputSet">
                                        <MdPhonelinkRing />
                                        <p>{countryCode.toUpperCase()} + {dialCode.toString()}</p>
                                        {/* <MdKeyboardArrowDown className="downArrow" /> */}
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

                                    <h3>{t("LOCATION")}</h3>
                                    <p>{t("LOCATION_PARA")}</p>
                                    <Form.Group className="mb-3">
                                        <Form.Select id="disabledSelect" className="customSelect">
                                            <option className="customOption">South Africa</option>
                                            <option>South Africa</option>
                                            <option>South Africa</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Select>
                                            <option >Select Province</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Control
                                            type="text"
                                            placeholder="Input City/Town"
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
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <Form.Control
                                                        type="password"
                                                        placeholder="Repeat Password"
                                                    />
                                                </Form.Group>
                                            </div>
                                        ) : ""}
                                    </div>
                                    <Button className="buttonAdd" type="submit">{t("SAVE")}</Button>
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