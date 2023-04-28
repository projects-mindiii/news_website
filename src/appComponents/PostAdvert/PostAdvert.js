import "./PostAdvert.css";
import { Row, Nav, Container, Col, Tab, FloatingLabel } from "react-bootstrap";
import Select from "react-select";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SublyApi from "../../helpers/Api";
import Form from 'react-bootstrap/Form';
import CommonEmailField from "../../formComponent/CommonInputFields/CommonEmailField";
import { useForm } from "react-hook-form";

import nameicon from "../../assets/images/Deal_icon/support_ico.png";
import staricon from "../../assets/images/Deal_icon/star_ico.png";
import { BsTrash3 } from "react-icons/bs";
import WatsappInput from "../../formComponent/CommonInputFields/WatsappInput";
import ContactInput from "../../formComponent/CommonInputFields/ContactInput";
import CustomBtn from "../../formComponent/Button/Button";

//-------Create a Deals Header component--------
function PostAdvert() {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm();
    const [watsappNo, setWatsappNo] = useState("");
    const [dialCodeWatsapp, setDialCodeWatsapp] = useState("27");
    const [countryCodeWatsapp, setCountryCodeWatsapp] = useState("za");
    const [phoneNo, setPhoneNo] = useState("");
    const [dialCode, setDialCode] = useState("27");
    const [countryCode, setCountryCode] = useState("za");
    const { userToken, currentUser, allMetaList, isLoading } = useSelector(
        (state) => state.user
    );
    const customStyles = {
        option: (defaultStyles, state) => ({
            ...defaultStyles,
            color: state.isSelected ? "#212529" : "#fff",
            backgroundColor: state.isSelected ? "#a0a0a0" : "#212529",
        }),

        control: (defaultStyles) => ({
            ...defaultStyles,
            backgroundColor: "#212529",
            padding: "10px",
            border: "none",
            boxShadow: "none",
        }),
        singleValue: (defaultStyles) => ({ ...defaultStyles, color: "#fff" }),
    };
    const [categoryType, setCategoryType] = useState("")
    const [userCategory, setUserCategory] = useState(4)
    const [locationType, setLocationType] = useState("");
    const [selectLocation, setSelectLocation] = useState(1);
    const [employmentEquity, setEmploymentEquity] = useState([{ id: 1, name: "none" }, { id: 2, name: "EE/ AA Required" }])
    const [employment, setEmployment] = useState(2);
    const [earingOption, setEaringOption] = useState();
    const [jobtype, setJobType] = useState();
    const [country, setCountry] = useState();
    const [provinces, setProvinces] = useState();
    console.log(allMetaList)
    useEffect(() => {
        async function getClassifiedLists() {
            let earningOption = [];
            let jobType = [];
            let countyryOption = [];
            let provinceOption = [];
            if (Object.keys(allMetaList).length > 0) {
                await allMetaList.earning_options.map((item) => {
                    earningOption.push({
                        label: item.name,
                        value: item.id,
                        id: item.id,
                    });
                });
                await allMetaList.job_type.map((item) => {
                    jobType.push({
                        label: item.name,
                        value: item.id,
                        id: item.id,
                    });
                });
                await allMetaList.countries.map((item) => {
                    countyryOption.push({
                        label: item.name,
                        value: item.id,
                        id: item.id,
                    });
                });

                await allMetaList.provinces.map((item) => {
                    provinceOption.push({
                        label: item.name,
                        value: item.id,
                        id: item.id,
                    });
                });
                //getting selection option in array as country list
                setCategoryType(allMetaList.category_type);
                setLocationType(allMetaList.job_location_type);
                await setEaringOption(earningOption);
                await setJobType(jobType);
                await setCountry(countyryOption);
                await setProvinces(provinceOption)
            }
        }
        getClassifiedLists();
    }, []);

    return (
        <div className="main">
            <React.Fragment >
                <Container>
                    <Row>
                        <Col xs={12} sm={12} md={12} lg={6}>
                            <div className="yourAdd">
                                <p>POST CLASSIFIED AD</p>
                                <div className="yourAdd_Note">
                                    <p>
                                        PLEASE NOTE -<small>All adverts are subject to approval. Adverts will be removed after 60 days. Delete or Edit your advert anytime</small>
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={6}>
                            <div>
                                <div className="post_Add_CategoryButton">
                                    <div className="headings">CATEGORY</div>
                                    <Form className="post_AddForm">
                                        <div className="post_Add_CategoryType">
                                            {categoryType ? categoryType.map((type, index) => (
                                                <div key={index}>
                                                    <Form.Check
                                                        className="post_Add_category"
                                                        checked={type.id == userCategory}
                                                        onChange={() => setUserCategory(type.id)}
                                                        type="radio"
                                                        id={type.name}
                                                        label={type.name}
                                                    />
                                                </div>
                                            )) : ""}
                                        </div>
                                        <div className="mb-3">
                                            <div className="headings mb-3" >AD DETAILS</div>
                                            <div>
                                            <h5>Advert Heading</h5>
                                            <Form.Group >
                                                <Form.Control
                                                    className="heading"
                                                    type="text"
                                                    placeholder="Enter Heading"
                                                />
                                            </Form.Group>
                                            </div>
                                            <div className="mt-3">
                                            <h5>Advert Description</h5>
                                            <Form.Group >
                                                <Form.Control as="textarea" className="post_Add_Discription" placeholder="Enter description" />
                                            </Form.Group>
                                            </div>
                                        </div>
                                        {userCategory == 6 &&
                                            <div className="post_Add_JobType">
                                                <div className="headings mb-3">JOB TYPE</div>
                                                <div className=" mb-3">
                                                    <Form.Group >
                                                        <Select
                                                            options={jobtype ? jobtype : {}}
                                                            placeholder="SELECT JOB TYPE"
                                                            id="location" name="location"
                                                            styles={{
                                                                placeholder: () => ({
                                                                    color: "white",
                                                                    position: "absolute",
                                                                    display: "flex",
                                                                    left: "15px",
                                                                }),
                                                            }}
                                                            theme={(theme) => ({
                                                                ...theme,
                                                                colors: {
                                                                    ...theme.colors,
                                                                    borderRadius: 0,
                                                                    primary25: "#f2f2f2",
                                                                    primary: "black",
                                                                    primary50: "#f2f2f2",
                                                                },
                                                            })}

                                                        />
                                                    </Form.Group></div></div>}
                                        {(userCategory == 7 || userCategory == 6) &&
                                            <div>
                                                <div className="headings ">ON SITE, HYBRID OR REMOTE?</div>
                                                <div className="post_Add_Locationtype selectNew">
                                                    {locationType ? locationType.map((type, index) => (
                                                        <div key={index} >
                                                            <Form.Check
                                                                className="post_Add_category"
                                                                checked={type.id == selectLocation}
                                                                onChange={() => setSelectLocation(type.id)}
                                                                type="radio"
                                                                id={type.name}
                                                                label={type.name}
                                                            />
                                                        </div>
                                                    )) : ""}
                                                </div>
                                            </div>}
                                        {(userCategory == 6) &&
                                            <div >
                                                <div className="headings ">EMPLOYMENT EQUITY</div>
                                                <div className="post_Add_EmploymentEnquiry  selectNew">
                                                    {employmentEquity ? employmentEquity.map((type, index) => (
                                                        <div key={index} >
                                                            <Form.Check
                                                                className="post_Add_category"
                                                                checked={type.id == employment}
                                                                onChange={() => setEmployment(type.id)}
                                                                type="radio"
                                                                id={type.name}
                                                                label={type.name}
                                                            />
                                                        </div>
                                                    )) : ""}
                                                </div>
                                            </div>}
                                        {(userCategory == 4) ? <div className="headings mb-3">PRICE</div> : <div className="headings mb-3">RENUMERATION</div>}
                                        {(userCategory == 4 || userCategory == 6) &&
                                            <div className="post_Add_Amount mb-3">
                                                <Form.Group className="amount">
                                                    <Form.Control
                                                        className="amount_Control"
                                                        type="text"
                                                        placeholder="Amount (optional)"
                                                    />
                                                    <div><p>R</p></div>
                                                </Form.Group></div>}
                                        {(userCategory == 4 || userCategory == 6) &&
                                            <div className="mb-3">
                                                <Form.Group >
                                                    <Select
                                                        options={earingOption ? earingOption : {}}
                                                        placeholder="SELECT EARNING OPTION"
                                                        id="earningoption" name="earningoption"
                                                        styles={{
                                                            placeholder: () => ({
                                                                color: "white",
                                                                position: "absolute",
                                                                left: "15px",
                                                            }),
                                                        }}
                                                        theme={(theme) => ({
                                                            ...theme,
                                                            colors: {
                                                                ...theme.colors,
                                                                borderRadius: 0,
                                                                primary25: "#f2f2f2",
                                                                primary: "black",
                                                                primary50: "#f2f2f2",
                                                            },
                                                        })}
                                                    />
                                                </Form.Group>
                                            </div>}
                                        {(userCategory == 4 || userCategory == 6) &&
                                            ['checkbox'].map((type) => (
                                                <div className="negotiable mb-3">
                                                    <Form.Check

                                                        className="negotiables"
                                                        checked
                                                        type="checkbox"
                                                        label={"Negotiable"}
                                                    />
                                                </div>))}
                                        <div className="headings mb-3">LOCATION</div>
                                        <div className="mb-3">
                                            <Form.Group>
                                                <Select
                                                    options={country ? country : {}}
                                                    placeholder="South Africa"
                                                    id="countries" name="countries"
                                                    styles={{
                                                        placeholder: () => ({
                                                            color: "#231F20",
                                                            position: "absolute",

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
                                                    })} />
                                            </Form.Group>
                                        </div>
                                        <div className="mb-3">
                                            <Form.Group >
                                                <Select
                                                    options={provinces ? provinces : {}}
                                                    placeholder="Selected Province"
                                                    id="province" name="province"
                                                    styles={{
                                                        placeholder: () => ({
                                                            color: "#231F20",
                                                            position: "absolute",

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
                                        <div className="mb-3">
                                            <Form.Group >
                                                <Select
                                                    options={earingOption ? earingOption : {}}
                                                    placeholder="Input City/Town"
                                                    id="cities" name="cities"
                                                    styles={{
                                                        placeholder: () => ({
                                                            color: "#231F20",
                                                            position: "absolute",
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
                                        <div className="headings ">CONTACT DETAILS</div>
                                        {(userCategory == 4 || userCategory == 6) &&
                                            <div className="post_Add_Name">
                                                <Form.Group className="names">
                                                    <Form.Control
                                                        className="names_Control"
                                                        type="text"
                                                        placeholder="Your Full Name"
                                                    />
                                                    <div><img src={nameicon} alt={nameicon} /></div>

                                                </Form.Group>
                                            </div>}
                                        <div className="post_Add_CompanyName">
                                            <Form.Group className="companyName">
                                                <Form.Control
                                                    className="companyName_Control"
                                                    type="text"
                                                    placeholder="Company Name (optional)"
                                                />
                                                <div><img src={staricon} alt={staricon} /></div>
                                            </Form.Group>
                                        </div>
                                        <CommonEmailField register={register} />
                                        <ContactInput phone={phoneNo} dialCode={dialCode} country={countryCode} phone1={setPhoneNo}
                                            dialCode1={setDialCode} country1={setCountryCode} />
                                        <WatsappInput watsappNo={watsappNo} dialCodeWatsapp={dialCodeWatsapp} countryCodeWatsapp={countryCodeWatsapp}
                                            setWatsappNo={setWatsappNo} setDialCodeWatsapp={setDialCodeWatsapp} setCountryCodeWatsapp={setCountryCodeWatsapp} />
                                        <div className="post_Add_AddPhoto">
                                            <CustomBtn children={"ADD PHOTOS"} type={"button"} onClick={""} buttonStyle={"#F76203"}></CustomBtn>
                                        </div>
                                    
                                        <div className="post_Add_Save">
                                            <CustomBtn children={"SAVE"} type={"button"} onClick={""} buttonStyle={"btn--danger--solid"}></CustomBtn>
                                        </div>
                                        <div className="post_Add_DeleteAdever">
                                            <button ><BsTrash3 />DELETE ADVERT</button>
                                        </div>
                                    </Form>
                                </div>

                            </div>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        </div>
    );
}
export default PostAdvert;
