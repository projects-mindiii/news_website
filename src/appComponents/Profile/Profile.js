import { Col, Container, Form, Row } from "react-bootstrap";
import "./Profile.css";
import { AiOutlineMail } from "react-icons/ai";
import { useState } from "react";
import ProfileImg from "../../assets/images/profile.png"
import { MdAddCircleOutline } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";

//--------Create a Profile component----------
function Profile() {
    const [profilePreview, setProfilePreview] = useState(ProfileImg);
    const [profileImage, setProfileImage] = useState("");

    //----- function for Upload update profile image-----
    function onImageChange(e) {
        if (e.target.files.length !== 0) {
            setProfilePreview(URL.createObjectURL(e.target.files[0]));
            setProfileImage(e.target.files[0]);
        }
    }

    return (
        <div className="main">
            <Container>
                <div className="profile">
                    <Row>
                        <Col sm={6}>
                            <div className="profileLeftPart">
                                <h3>YOUR PROFILE</h3>
                                <p><strong>PLEASE NOTE - </strong>
                                    A profile is required to post and manage classified adverts.
                                    You can create or edit yout profile here.
                                </p>
                            </div>
                        </Col>
                        <Col sm={6}>
                            <div className="profileRightPart">
                                <h4>YOUR PROFILE</h4>
                                <h3>Your Profile Details</h3>
                                <p>Tell us a little about you, used for classifieds</p>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicName">
                                        <Form.Control
                                            type="text"
                                            placeholder="Full Name"
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicName">
                                        <Form.Control
                                            type="text"
                                            placeholder="Company Name (Optional)"
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicName">
                                        <Form.Control
                                            type="text"
                                            placeholder="Position/Occupation (Optional)"
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">

                                        <Form.Control
                                            type="text"
                                            placeholder="EMAIL"
                                        />
                                        {/* <AiOutlineMail/> */}

                                    </Form.Group>

                                    <h3>Your Location</h3>
                                    <p>Not public, used for your classified adverts</p>
                                    <Form.Group className="mb-3">
                                        <Form.Select id="disabledSelect">
                                            <option >South Africa</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Select>
                                            <option >Select Provience</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicName">
                                        <Form.Control
                                            type="text"
                                            placeholder="Input City/Town"
                                        />
                                    </Form.Group>
                                    <h3>Your Profile Photo</h3>
                                    <p>Add in profile photo for company logo</p>
                                    <div className="profileImg ">
                                        <div className="profileIcon">
                                            <label for="uploadImage">
                                                <MdAddCircleOutline />
                                            </label>
                                            <h6>ADD</h6>
                                        </div>


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
                                        <div className="profileIcon">
                                            <MdOutlineCancel />
                                            <h6>CLEAR</h6>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
}
export default Profile;