import "./PostAdvert.css";
import { Row, Nav, Container, Col, Tab, FloatingLabel } from "react-bootstrap";
import Select from "react-select";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SublyApi from "../../helpers/Api";
import Form from 'react-bootstrap/Form';
import ProfileEmail from "../../formComponent/ProfileCommonInput/ProfileEmail";
import ContactInput from "../../formComponent/ProfileCommonInput/ContactInput";
import WatsappInput from "../../formComponent/ProfileCommonInput/WatsappInput";
import nameicon from "../../assets/images/Deal_icon/support_ico.png";
import staricon from "../../assets/images/Deal_icon/star_ico.png";
import { BsTrash3 } from "react-icons/bs";

//-------Create a Deals Header component--------
function PostAdvert() {
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
                                        <div>
                                            <div className="headings post_Add_HeadingGap" >AD DETAILS</div>
                                            <h5>Advert Heading</h5>
                                            <Form.Group className="mb-3">
                                                <Form.Control
                                                    className="heading"
                                                    type="text"
                                                    placeholder="Enter Heading"
                                                />
                                            </Form.Group>
                                            <h5>Advert Description</h5>
                                            <Form.Group className="mb-3">
                                                <Form.Control as="textarea" className="post_Add_Discription" placeholder="Enter description" />
                                            </Form.Group>
                                        </div>
                                        {userCategory == 6 &&
                                            <div className="post_Add_JobType">
                                                <div className="headings">JOB TYPE</div>
                                                <div>
                                                    <Form.Group >
                                                        <Select
                                                            options={jobtype ? jobtype : {}}
                                                            placeholder="SELECT JOB TYPE"
                                                            id="location" name="location"
                                                            styles={{
                                                                placeholder: () => ({
                                                                    fontSize: "22px",
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
                                                <div className="headings post_Add_HeadingGap ">ON SITE, HYBRID OR REMOTE?</div>
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
                                            <div>
                                                <div className="headings post_Add_HeadingGap">EMPLOYMENT EQUITY</div>
                                                <div className="post_Add_Locationtype selectNew">
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
                                        {(userCategory == 4 || userCategory == 6) &&
                                            <div className="post_Add_DivPriceGap">
                                                {(userCategory == 4) ? <div className="headings post_Add_PriceGap">PRICE</div> : <div className="headings  post_Add_Remumeration">RENUMERATION</div>}

                                                <Form.Group className="amount">
                                                    <Form.Control
                                                        className="amounts"
                                                        type="text"
                                                        placeholder="Amount (optional)"
                                                    />
                                                    <p>R</p>
                                                </Form.Group></div>}
                                        {(userCategory == 4 || userCategory == 6) &&
                                            <div >
                                                <Form.Group className="mb-3 ">
                                                    <Select
                                                        options={earingOption ? earingOption : {}}
                                                        placeholder="SELECT EARNING OPTION"
                                                        id="earningoption" name="earningoption"
                                                        styles={{
                                                            placeholder: () => ({
                                                                fontSize: "22px",
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
                                                <div className="negotiable post_Add_EaringOption">
                                                    <Form.Check

                                                        className="negotiables"
                                                        checked
                                                        type="checkbox"
                                                        label={"Negotiable"}
                                                    />
                                                </div>))}
                                        <div className="headings post_Add_Locations ">LOCATION</div>
                                        <div >
                                            <Form.Group className="mb-3 ">
                                                <Select
                                                    options={country ? country : {}}
                                                    placeholder="South Africa"
                                                    id="countries" name="countries"
                                                    styles={{
                                                        placeholder: () => ({
                                                            fontSize: "22px",
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
                                        <div >
                                            <Form.Group className="mb-3 ">
                                                <Select
                                                    options={provinces ? provinces : {}}
                                                    placeholder="Selected Province"
                                                    id="province" name="province"
                                                    styles={{
                                                        placeholder: () => ({
                                                            fontSize: "22px",
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
                                        <div >
                                            <Form.Group className="mb-3 ">
                                                <Select
                                                    options={earingOption ? earingOption : {}}
                                                    placeholder="Input City/Town"
                                                    id="cities" name="cities"
                                                    styles={{
                                                        placeholder: () => ({
                                                            fontSize: "22px",
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
                                        <div className="headings post_Add_Locations ">CONTACT DETAILS</div>
                                        {(userCategory == 4 || userCategory == 6) &&
                                            <div className="post_Add_DivPriceGap">

                                                <Form.Group className="amount">
                                                    <Form.Control
                                                        className="amounts"
                                                        type="text"
                                                        placeholder="Your Full Name"
                                                    />
                                                    <div><img src={nameicon} alt={nameicon} /></div>

                                                </Form.Group>
                                            </div>}
                                        <div className="post_Add_DivPriceGap">
                                            <Form.Group className="amount">
                                                <Form.Control
                                                    className="amounts"
                                                    type="text"
                                                    placeholder="Company Name (optional)"
                                                />                                                <div><img src={staricon} alt={staricon} /></div>

                                            </Form.Group>
                                        </div>
                                        <ProfileEmail />
                                        <ContactInput />
                                        <WatsappInput />
                                        <div className="post_Add_AddPhoto">
                                            <button >ADD PHOTOS</button>
                                        </div>
                                        <div className="post_Add_Save">
                                            <button >SAVE</button>
                                        </div>
                                        <div className="post_Add_DeleteAdever">
                                            <button ><BsTrash3/>DELETE ADVERT</button>
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
