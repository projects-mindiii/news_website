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
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from 'react-bootstrap/InputGroup';
//-------Create a Deals Header component--------
function PostAdvert() {
    const { userToken, currentUser, allMetaList, isLoading } = useSelector(
        (state) => state.user
    );
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm();
    const [trigger, setTrigger] = useState(false)
    const [watsappNo, setWatsappNo] = useState("");
    const [dialCodeWatsapp, setDialCodeWatsapp] = useState("27");
    const [countryCodeWatsapp, setCountryCodeWatsapp] = useState("za");
    const [phoneNo, setPhoneNo] = useState("");
    const [dialCode, setDialCode] = useState("27");
    const [countryCode, setCountryCode] = useState("za");
    const [categoryType, setCategoryType] = useState("")
    const [userCategory, setUserCategory] = useState(4)
    const [locationType, setLocationType] = useState("");
    const [selectLocation, setSelectLocation] = useState();
    const [negotiables, setNegotiables] = useState(true);
    const [employmentEquity, setEmploymentEquity] = useState([{ id: 1, name: "none" }, { id: 2, name: "EE/ AA Required" }])
    const [employment, setEmployment] = useState();
    const [earingOption, setEaringOption] = useState();
    const [cityOption, setcityOption] = useState();
    const [cityValue, setCityValue] = useState();
    const [currencies, setCurrencies] = useState();
    const [currencyvalue, setcurrencyvalue] = useState();
    const [earningValue, setEarningValue] = useState();
    const [jobtype, setJobType] = useState();
    const [jobValue, setJobValue] = useState();
    const [country, setCountry] = useState({ value: 1, label: "South Africa", id: 1 },
        { value: 0, label: "Outside South Africa", id: 0 },);
    const [countryvalue, setCountryValue] = useState();
    const [provinces, setProvinces] = useState();
    const [provincesvalue, setProvinceValue] = useState();
    function negotiableWork() {
        document.getElementById("negotiables").checked == true ? setNegotiables(1) : setNegotiables(0)
    }
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
    
    useEffect(() => {
        async function getClassifiedLists() {
            let earningOption = [];
            let jobType = [];
            let countyryOption = [];
            let provinceOption = [];
            let currencyoption = [];
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
                await allMetaList.currencies.map((item) => {
                    currencyoption.push({
                        id: item.id, name: item.name, symbol: item.symbol, code: item.code
                    });
                });
                //getting selection option in array as country list
                setCategoryType(allMetaList.category_type);
                setLocationType(allMetaList.job_location_type);
                await setEaringOption(earningOption);
                await setJobType(jobType);
                await setCountry(countyryOption);
                await setProvinces(provinceOption)
                await setCurrencies(currencyoption)
                setValue("email", currentUser.email)
                setValue("fullName", currentUser.name)

            }
        }
        getClassifiedLists();
    }, []);

    async function onSubmit(data) {    
        let requestData = new FormData();
        requestData.append('heading', data.heading);
        requestData.append('description', data.description);
        requestData.append('is_default_country', countryvalue.id == 204
            ? 1 : 0);
        requestData.append(
            'country_id', countryvalue.value
        );
        requestData.append(
            'classified_type', userCategory
        );
        requestData.append(
            'emp_equity', employment
        );
        requestData.append(
            'province', provincesvalue.id
        );
        requestData.append(
            'city', data.city
        );
        requestData.append(
            'currency_id',currencyvalue.id
        );
        requestData.append(
            'is_negotiable', negotiables
        );
        requestData.append(
            "job_location_type", countryvalue.id
        );
        requestData.append(
            'price', data.amount
        );

        requestData.append(
            "earning_options", earningValue.value
        )
        requestData.append(
            'job_type', jobValue.value ? jobValue.value : ""
        );
        requestData.append(
            "contact_name", data.fullName
        );
        requestData.append(
            "email", data.email
        );
        requestData.append(
            "contact_compan", data.companyName
        );
        requestData.append(
            "dial_code", dialCode
        );
        requestData.append(
            "country_code", countryCode
        );
        requestData.append(
            "contact_number", phoneNo
        );
        requestData.append(
            "whatsapp_country_code", countryCodeWatsapp);
        requestData.append(
            "whatapp_contact_number", watsappNo
        );
        requestData.append(
            "whatsapp_dail_code", dialCodeWatsapp
        );
        requestData.append(
            "classifiedGallery",""
        );
        await SublyApi.addClassifiedList(requestData, userToken).then((responsejson) => {
            if (responsejson.status_code == 500) {
            } else if (responsejson.status_code == 400) {
            } else {
                if (responsejson.status_code == 200) {

                }
            }
        });
    }
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
                                    <Form className="post_AddForm" onSubmit={handleSubmit(onSubmit)}>
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
                                                        {...register("heading", {
                                                            required: {
                                                                value: true,
                                                                message: "Add an Adver Title",
                                                            },
                                                        })}
                                                    />
                                                </Form.Group>
                                            </div>
                                            {errors.heading && (
                                                <div className="post_Add_Error">
                                                    {errors.heading.message}
                                                </div>
                                            )}


                                            <div className="mt-3">
                                                <h5>Advert Description</h5>
                                                <Form.Group >
                                                    <Form.Control as="textarea"
                                                        {...register("description", {
                                                            required: {
                                                                value: true,
                                                                message: "Include a Description",
                                                            },
                                                        })} className="post_Add_Discription" placeholder="Enter description" />
                                                </Form.Group>
                                            </div>
                                            {errors.description && (
                                                <div className="post_Add_Error">
                                                    {errors.heading.message}
                                                </div>
                                            )}

                                        </div>
                                        {userCategory == 6 &&
                                            <div className="post_Add_JobType">
                                                <div className="headings mb-3">JOB TYPE</div>
                                                <div className=" mb-3">
                                                    <Form.Group >
                                                        <Select
                                                            options={jobtype ? jobtype : {}}
                                                            onChange={setJobValue}
                                                            value={jobValue}
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
                                        {trigger == true && userCategory == 6 && !jobValue && (
                                            <div className="post_Add_Error">
                                                Select job Type
                                            </div>
                                        )}
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
                                            </div>
                                        }
                                        {(userCategory == 7 || userCategory == 6) && !selectLocation && (
                                            <div className="post_Add_Error">
                                                Select Option
                                            </div>
                                        )}
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
                                        {userCategory == 6 && !selectLocation && (
                                            <div className="post_Add_Error">
                                                Select Option
                                            </div>)}
                                        {(userCategory == 4) ? <div className="headings mb-3">PRICE</div> : <div className="headings mb-3">RENUMERATION</div>}
                                        {/* {(userCategory == 4 || userCategory == 6) &&
                                            <div className="post_Add_Amount mb-3">
                                                <Form.Group className="amount">
                                                    <Form.Control
                                                        className="amount_Control"
                                                        type="text"
                                                        placeholder="Amount (optional)"
                                                        {...register("amount", userCategory == 4 && {
                                                            required: {
                                                                value: true,
                                                                message: "Please enter amount",
                                                            },
                                                        })}
                                                    />
                                                </Form.Group></div>} */}

                                        {/* {(userCategory == 4) && errors.amount && (
                                            <div className="post_Add_Error">
                                                {errors.amount.message}
                                            </div>)} */}
                                        <div className="post_Add_priceDiv">
                                            <InputGroup className="mb-3">
                                                <DropdownButton
                                                    variant="outline-secondary"
                                                    title={currencyvalue && currencyvalue.symbol ? currencyvalue.symbol : currencies && currencies.length > 0 && currencies[0].symbol}
                                                    id="input-group-dropdown-1"
                                                >{currencies && currencies.map((item, index) => (
                                                    <Dropdown.Item onClick={() => setcurrencyvalue(item)}>{item.name}</Dropdown.Item>))}
                                                </DropdownButton>
                                                <Form.Group className="amount">
                                                    <Form.Control
                                                        className="amount_Control"
                                                        type="text"
                                                        placeholder="Amount (optional)"
                                                        {...register("amount", userCategory == 4 && {
                                                            required: {
                                                                value: true,
                                                                message: "Please enter amount",
                                                            },
                                                        })}
                                                    />
                                                </Form.Group>
                                            </InputGroup>
                                        </div>



                                        {(userCategory == 4 || userCategory == 6) &&
                                            <div className="mb-3">
                                                <Form.Group >
                                                    <Select
                                                        options={earingOption ? earingOption : {}}
                                                        onChange={setEarningValue}
                                                        value={earningValue}
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
                                        {(userCategory == 4 || userCategory == 6) && !earningValue && (
                                            <div className="post_Add_Error">
                                                Select Earning Option
                                            </div>)}
                                        {(userCategory == 4 || userCategory == 6) &&

                                            <div className="negotiable mb-3">
                                                <Form.Check
                                                    id="negotiables"
                                                    onChange={negotiableWork}
                                                    className="negotiables"
                                                    type="checkbox"
                                                    label={"Negotiable"}
                                                    checked={negotiables == 1}
                                                />
                                            </div>}
                                        {(userCategory == 4 || userCategory == 6) && negotiables == 0 && (
                                            <div className="post_Add_Error">
                                                Please checkbox Click
                                            </div>)}
                                        <div className="headings mb-3">LOCATION</div>
                                        <div className="mb-3">
                                            <Form.Group>
                                                <Select
                                                    options={country ? country : {}}
                                                    onChange={setCountryValue}
                                                    value={countryvalue}
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
                                                    onChange={setProvinceValue}
                                                    value={provincesvalue}
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
                                        <Form.Group className="mb-3">
                                            <Form.Control
                                                type="text"
                                                placeholder="Input City/Town"
                                                {...register("city", {
                                                    required: {
                                                        value: true,
                                                        message: "Input City/Town",
                                                    },
                                                })}
                                            />
                                        </Form.Group>

                                        {errors.city && (
                                            <div className="post_Add_Error">
                                                {errors.city.message}
                                            </div>
                                        )}

                                        <div className="headings ">CONTACT DETAILS</div>
                                        {(userCategory == 4 || userCategory == 6) &&
                                            <div className="post_Add_Name">
                                                <Form.Group className="names">
                                                    <Form.Control
                                                        className="names_Control"
                                                        type="text"
                                                        placeholder="Your Full Name"
                                                        {...register("fullName", {
                                                            required: {
                                                                value: true,
                                                                message: "ENTER_NAME",
                                                            },
                                                        })}
                                                    />
                                                    <div><img src={nameicon} alt={nameicon} /></div>

                                                </Form.Group>
                                            </div>}
                                        {errors.fullName && (
                                            <div className="post_Add_Error">
                                                {errors.fullName.message}
                                            </div>
                                        )}
                                        <div className="post_Add_CompanyName">
                                            <Form.Group className="companyName">
                                                <Form.Control
                                                    className="companyName_Control"
                                                    type="text"
                                                    placeholder="Company Name (optional)"
                                                    {...register("companyName", {
                                                        required: {
                                                            value: true,
                                                            message: "Enter Company Name",
                                                        },
                                                    })}
                                                />
                                                <div><img src={staricon} alt={staricon} /></div>
                                            </Form.Group>
                                        </div>
                                        {errors.companyName && (
                                            <div className="post_Add_Error">
                                                {errors.companyName.message}
                                            </div>
                                        )}
                                        <CommonEmailField register={register} />
                                        {errors.email && (
                                            <div className="post_Add_Error">
                                                {errors.email.message}
                                            </div>
                                        )}
                                        <ContactInput phone={phoneNo} dialCode={dialCode} country={countryCode} phone1={setPhoneNo}
                                            dialCode1={setDialCode} country1={setCountryCode} />
                                        <WatsappInput watsappNo={watsappNo} dialCodeWatsapp={dialCodeWatsapp} countryCodeWatsapp={countryCodeWatsapp}
                                            setWatsappNo={setWatsappNo} setDialCodeWatsapp={setDialCodeWatsapp} setCountryCodeWatsapp={setCountryCodeWatsapp} />
                                        <div className="post_Add_AddPhoto">
                                            <CustomBtn children={"ADD PHOTOS"} type={"button"} onClick={""} ></CustomBtn>
                                        </div>

                                        <div className="post_Add_Save">
                                            <div className="buttonAdd1">
                                                <CustomBtn  >SAVE</CustomBtn>
                                            </div>
                                        </div>
                                        {/* <div className="post_Add_DeleteAdever">
                                            <button ><BsTrash3 />DELETE ADVERT</button>
                                        </div> */}
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
