import "./PostAdvert.css";
import { Row, Nav, Container, Col, Tab, FloatingLabel } from "react-bootstrap";
import Select from "react-select";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SublyApi from "../../helpers/Api";
import Form from 'react-bootstrap/Form';
import CommonEmailField from "../../formComponent/CommonInputFields/CommonEmailField";
import { useForm, Controller } from "react-hook-form";
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
        getValues,
        control,
        watch,
        formState: { errors },
    } = useForm();
    const formDataValues = getValues();
    const [watsappNo, setWatsappNo] = useState("");
    const [dialCodeWatsapp, setDialCodeWatsapp] = useState("27");
    const [countryCodeWatsapp, setCountryCodeWatsapp] = useState("za");
    const [phoneNo, setPhoneNo] = useState("");
    const [dialCode, setDialCode] = useState("27");
    const [countryCode, setCountryCode] = useState("za");
    const [categoryType, setCategoryType] = useState("")
    const [locationType, setLocationType] = useState("");
    const [employmentEquity, setEmploymentEquity] = useState([{ id: 1, name: "none" }, { id: 2, name: "EE/ AA Required" }])
    const [earingOption, setEaringOption] = useState();
    const [currencies, setCurrencies] = useState();
    const [currencyvalue, setcurrencyvalue] = useState();
    const [jobTypeOption, setJobTypeOption] = useState();
    const [country, setCountry] = useState({ value: 1, label: "South Africa", id: 1 },
        { value: 0, label: "Outside South Africa", id: 0 },);
    const [provinces, setProvinces] = useState();

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
                await setJobTypeOption(jobType);
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
        //         "classified_type:interger
        // classified_type is required
        //         heading: string
        // heading is required
        //         description: string 
        // description is required
        //         is_default_country: interger
        // is_default_country is required(0: other, 1:default(south africa)
        //         country_id: interger
        // country_id is required  when contry not south africa)
        //         province: integer
        // province is required  when country is south africa
        //         city: interger
        // city is required
        //         price: decimal
        // price is required  when classified type is for sale
        //         currency_id: integer
        // currency id is required  when classfied type is for sale
        //         is_negotiable: integer
        // is negotiable is required when classified is for sale and job offer
        //         earning_options: integer
        // earning option is required
        //         job_type: integer
        // job type is required when classified type is job offer
        //         job_location_type: integer
        // job location is required when classified type is job offer and job seeker
        //         emp_equity: integer
        // emp equity is required when classified type is job offer
        //         contact_name: string
        // contact name is required
        //         email: string
        // email is required
        //         contact_company: string
        // company is optional
        //         dial_code: integer
        //         country_code: string
        //         contact_number: integer
        //         whatsapp_dail_code: integer
        //         whatsapp_country_code: string
        //         whatapp_contact_number: integer
        //         classifiedGallery:file object
        // optional"
        let requestData = new FormData();
        requestData.append('heading', data.heading);
        requestData.append('description', data.description);
        requestData.append('is_default_country', 
            );
        requestData.append(
            'country_id', 
        );
        requestData.append(
            'classified_type', formDataValues && formDataValues.categorytype
        );
        requestData.append(
            'emp_equity', 
        );
        requestData.append(
            'province', 
        );
        requestData.append(
            'city', data.city
        );
        requestData.append(
            'currency_id', currencyvalue.id
        );
        requestData.append(
            'is_negotiable', 
        );
        requestData.append(
            "job_location_type", 
        );
        requestData.append(
            'price', data.amount
        );

        requestData.append(
            "earning_options", 
        )
        requestData.append(
            'job_type', 
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
            "classifiedGallery", ""
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
                                                        {...register("categorytype", {
                                                            required: {
                                                                value: true,
                                                                message: "Select a Category",
                                                            }
                                                        })}
                                                        className="post_Add_category"
                                                        type="radio"
                                                        label={type.name}
                                                        value={type.id}
                                                        
                                                    />
                                                </div>
                                            )) : ""}
                                        </div>
                                        {errors.categorytype && (
                                            <div className="post_Add_Error">
                                                {errors.categorytype.message}
                                            </div>
                                        )}
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
                                                    {errors.description.message}
                                                </div>
                                            )}

                                        </div>
                                        {formDataValues && formDataValues.categorytype == 6 &&
                                            <div className="post_Add_JobType">
                                                <div className="headings mb-3">JOB TYPE</div>
                                                <div className=" mb-3">
                                                    <Form.Group >
                                                        <Controller
                                                            control={control}
                                                            name="jobType"
                                                            render={({
                                                                field: { onChange, value, name, ref },
                                                                fieldState: { invalid, isTouched, isDirty, error },
                                                                formState,
                                                            }) => (
                                                                <Select
                                                                    id="jobtype"
                                                                    placeholder="SELECT JOB TYPE"
                                                                    // value={{ value: 0, label: "Select Job Type", id: 0}}
                                                                    options={jobTypeOption}
                                                                    onChange={onChange} // send value to hook form
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
                                                            )}
                                                            rules={{ required: true }}
                                                        />
                                                    </Form.Group></div></div>}
                                        {errors.jobType && (
                                            <div className="post_Add_Error">
                                                Select job Type
                                            </div>
                                        )}
                                        {(formDataValues && formDataValues.categorytype == 7) || (formDataValues && formDataValues.categorytype == 6) &&
                                            <div>
                                                <div className="headings ">ON SITE, HYBRID OR REMOTE?</div>
                                                <div className="post_Add_Locationtype selectNew">
                                                    {locationType ? locationType.map((type, index) => (
                                                        <div >
                                                            <Form.Check
                                                                {...register("selectlocationtype", {
                                                                    required: {
                                                                        value: true,
                                                                    }
                                                                })}
                                                                className="post_Add_category"
                                                                // onChange={(e) => e.target.id}
                                                                type="radio"
                                                                // id={type.id}
                                                                label={type.name}
                                                                value={type.id}
                                                            />
                                                        </div>
                                                    )) : ""}
                                                </div>
                                            </div>
                                        }
                                        {(formDataValues && formDataValues.categorytype == 7 || formDataValues && formDataValues.categorytype == 6) && errors.selectlocationtype && (
                                            <div className="post_Add_Error">
                                                Select Option
                                            </div>
                                        )}
                                        {(formDataValues && formDataValues.categorytype == 6) &&
                                            <div >
                                                <div className="headings ">EMPLOYMENT EQUITY</div>
                                                <div className="post_Add_EmploymentEnquiry  selectNew">
                                                    {employmentEquity ? employmentEquity.map((type, index) => (
                                                        <div  >
                                                            <Form.Check
                                                                {...register("employmentenquiry", {
                                                                    required: {
                                                                        value: true,
                                                                    }
                                                                })}
                                                                className="post_Add_category"
                                                                type="radio"
                                                                label={type.name}
                                                                value={type.id}

                                                            />
                                                        </div>

                                                    )) : ""}
                                                </div>
                                            </div>}
                                        {formDataValues && formDataValues.categorytype == 6 && errors.employmentenquiry && (
                                            <div className="post_Add_Error">
                                                Select Option
                                            </div>)}
                                        {formDataValues && formDataValues.categorytype == 4 ? <div className="headings mb-3">PRICE</div> : formDataValues && formDataValues.categorytype == 6 && <div className="headings mb-3">RENUMERATION</div>}
                                        {(formDataValues && formDataValues.categorytype == 4 || formDataValues && formDataValues.categorytype == 6) &&
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
                                                            {...register("amountvalue", formDataValues && formDataValues.categorytype == 4 && {
                                                                required: {
                                                                    value: true,
                                                                    message: "Please enter amount",
                                                                },
                                                            })}
                                                        />
                                                    </Form.Group>
                                                </InputGroup>
                                            </div>}
                                        {(formDataValues && formDataValues.categorytype == 4 || formDataValues && formDataValues.categorytype == 6) && errors.amountvalue && <div className="post_Add_Error">Please Fill Amount</div>}


                                        {(formDataValues && formDataValues.categorytype == 4 || formDataValues && formDataValues.categorytype == 6) &&
                                            <div className="mb-3">
                                                <Form.Group >
                                                    <Controller
                                                        control={control}
                                                        name="earningoption"
                                                        render={({
                                                            field: { onChange, value, name, ref },
                                                            fieldState: { invalid, isTouched, isDirty, error },
                                                            formState,
                                                        }) => (
                                                            <Select
                                                                options={earingOption}
                                                                onChange={onChange}
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
                                                        )}
                                                        rules={{ required: true }}
                                                    />
                                                </Form.Group>
                                            </div>}
                                        {(formDataValues && formDataValues.categorytype == 4 || formDataValues && formDataValues.categorytype == 6) && errors.earningoption && <div className="post_Add_Error">Select Earning Option</div>}
                                        {(formDataValues && formDataValues.categorytype == 4 || formDataValues && formDataValues.categorytype == 6) &&

                                            <div className="negotiable mb-3">
                                                <Form.Check
                                                    {...register("negotiabl")}
                                                    className="negotiables"
                                                    type="checkbox"
                                                    label={"Negotiable"}
                                                />
                                            </div>}
                                        {(formDataValues && formDataValues.categorytype == 4 || formDataValues && formDataValues.categorytype == 6) && errors.negotiabl == 0 && (
                                            <div className="post_Add_Error">
                                                Please checkbox Click
                                            </div>)}
                                        <div className="headings mb-3">LOCATION</div>
                                        <div className="mb-3">
                                            <Form.Group>

                                                <Controller

                                                    name="countries"
                                                    control={control}
                                                    render={({
                                                        field: { onChange, value, name, ref },
                                                        fieldState: { invalid, isTouched, isDirty, error },
                                                        formState,
                                                    }) => (
                                                        <Select
                                                            options={country ? country : {}}
                                                            onChange={onChange}
                                                            // value={countryvalue}
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
                                                    )}
                                                />
                                            </Form.Group>
                                        </div>
                                        <div className="mb-3">
                                            <Form.Group >
                                                <Controller
                                                    control={control}
                                                    name="provinces"
                                                    render={({
                                                        field: { onChange, value, name, ref },
                                                        fieldState: { invalid, isTouched, isDirty, error },
                                                        formState,
                                                    }) => (
                                                        <Select
                                                            options={provinces}
                                                            onChange={onChange}
                                                            placeholder="Selected Province"
                                                            id="province"
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
                                                    )}                                   
                                                
                                                rules={{ required: formDataValues && formDataValues.countries && formDataValues.countries.id == 204 ? true : false }}
                                                />
                                            </Form.Group>
                                        </div>
                                        {errors.provinces && <div className="post_Add_Error">Select Province</div>}

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
                                        {(formDataValues && formDataValues.categorytype == 4 || formDataValues && formDataValues.categorytype == 6) &&
                                            <div className="post_Add_Name">
                                                <Form.Group className="names">
                                                    <Form.Control
                                                        className="names_Control"
                                                        type="text"
                                                        placeholder="Your Full Name"
                                                        {...register("fullName", {
                                                            required: {
                                                                value: true,
                                                                message: "Input Your Full Name",
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
