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
import { useTranslation } from "react-i18next";
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
    const { t } = useTranslation();
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
    const [currencies, setCurrencies] = useState( );
    const [currencyvalue, setcurrencyvalue] = useState({id: 154, name: 'South African rand', symbol: 'R', code: 'ZAR'});
    const [jobTypeOption, setJobTypeOption] = useState();
    const [CategoryValue, setCategoryValue] = useState();
    const [country, setCountry] = useState();
    const[currencyError,setCurrencyError]=useState("")
    const [isDefaultCountry, setIsDefaultCountry] = useState([{
        label: "Outside South Africa",
        value: 1,
        id: 0
    }, {
        label: "South Africa",
        value: 2,
        id: 1
    }]);
    const [profilePreview, setProfilePreview] = useState();
    const [profileImage, setProfileImage] = useState("");
    const [countryValue, setCountryValue] = useState(isDefaultCountry[1]);
    const [provinces, setProvinces] = useState({label: 'Free State', value: 932, id: 932});
    const [provinceValue,setProvinceValue]= useState({label: 'Free State', value: 932, id: 932});
   
    function getCurrencyid(){
        if(currencyvalue || currencyvalue !== undefined){
            setCurrencyError();
        }
        else{
            setCurrencyError("PLEASE SELECT CURRENCY")
        }
    }
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
                setCategoryType(allMetaList.category_type);
                setLocationType(allMetaList.job_location_type);
                await setEaringOption(earningOption);
                await setJobTypeOption(jobType);
                await setCountry(countyryOption);
                await setProvinces(provinceOption)
                await setCurrencies(currencyoption)
                setValue("email", currentUser.email)
                setValue("fullName", currentUser.name)
                setValue("countries", {
                    label: "South Africa",
                    value: 2,
                    id: 1
                } )
                setValue("provinces", {label: 'Free State', value: 932, id: 932})
                     
            }
        }
        getClassifiedLists();
    }, []);

    async function onSubmit(data) {       
        let requestData = new FormData();
        requestData.append('heading', data.heading && data.heading);
        requestData.append('description', data.description && data.description);
        requestData.append('is_default_country',countryValue.id && countryValue.id
        );
        requestData.append(
            'country_id',countryValue.id == 0 && data.countriess.id
        );
        requestData.append(
            'classified_type', data.categorytype && data.categorytype
        ); 
        {data.categorytype == 7 || data.categorytype == 6 &&
        requestData.append(
            'emp_equity',data.employmentenquiry && data.employmentenquiry
        );}
        requestData.append(
            'province',countryValue.id == 1 && data.provinces.id
        );
        requestData.append(
            'city', data.city && data.city
        );
        {data.categorytype == 4 || data.categorytype ==6 &&
        requestData.append(
            'currency_id',currencyvalue &&  currencyvalue.id
        );}
        {data.categorytype == 4 || data.categorytype == 6 &&
        requestData.append(
            'is_negotiable',data.negotiabl == true ? 1 : 0
        );}
        {data.categorytype == 7 || data.categorytype == 6 &&
        requestData.append(
            "job_location_type",data.selectlocationtype && data.selectlocationtype
        );}
        {data.categorytype == 4 || data.categorytype == 6 &&
        requestData.append(
            'price',data.amountvalue &&  data.amountvalue
        );}
        {data.categorytype ==6 &&
        requestData.append(
            "earning_options",data.earningoption && data.earningoption.id && data.earningoption.id
        )}
        {data.categorytype ==6 &&
        requestData.append(
            'job_type',data.jobType && data.jobType.id
        );}
        requestData.append(
            "contact_name", data.fullName  && data.fullName
        );
        requestData.append(
            "email", data.email && data.email
        );
        requestData.append(
            "contact_compan", data.companyName && data.companyName
        );
        requestData.append(
            "dial_code", dialCode && dialCode
        );
        requestData.append(
            "country_code", countryCode && countryCode
        );
        requestData.append(
            "contact_number", phoneNo && phoneNo
        );
        requestData.append(
            "whatsapp_country_code", countryCodeWatsapp && countryCodeWatsapp);
        requestData.append(
            "whatapp_contact_number", watsappNo && watsappNo
        );
        requestData.append(
            "whatsapp_dail_code", dialCodeWatsapp && dialCodeWatsapp
        );
        requestData.append(
            "classifiedGallery", profileImage ? profileImage :""
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
    function onImageChange(e) {
        if (e.target.files.length !== 0) {
            setProfilePreview(URL.createObjectURL(e.target.files[0]));
            setProfileImage(e.target.files[0]);
        }
    }
    return (
        <div className="main">
            <React.Fragment >
                <Container>
                    <Row>
                        <Col xs={12} sm={12} md={12} lg={6}>
                            <div className="yourAdd">
                                <p>{t("POST_CLASSIFIED_AD")}</p>
                                <div className="yourAdd_Note">
                                    <p>
                                        {t("PLEASE_NOTE")}<small>{t("ALL_ADVERT_REMOVE_60")}</small>
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={6}>
                            <div>
                                <div className="post_Add_CategoryButton">
                                    <div className="headings">{t("CATEGORY")}</div>
                                    <Form className="post_AddForm" onSubmit={handleSubmit(onSubmit,getCurrencyid)}>
                                        <div className="post_Add_CategoryType">
                                            {categoryType ? categoryType.map((type, index) => (
                                                <div key={index}>
                                                    <Form.Check
                                                        {...register("categorytype", {
                                                            required: {
                                                                value: true,
                                                                message: t("SELECT_CATEGORY"),
                                                            }
                                                        })}
                                                        
                                                        onChange={() => setCategoryValue(type.id)}
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
                                        {CategoryValue &&  <div>
                                        <div className="mb-3">
                                            <div className="headings mb-3" >{t("ADD_DETAIL")}</div>
                                            <div>
                                                <h5>{t("ADVERT_HEADING")}</h5>
                                                <Form.Group >
                                                    <Form.Control
                                                        className="heading"
                                                        type="text"
                                                        maxlength="70"
                                                        placeholder="Enter Heading"
                                                        {...register("heading", {
                                                            required: {
                                                                value: true,
                                                                message:t("ADD_ADEVERT_TITLE"),
                                                            },
                                                            minLength: {
                                                                value: 3,
                                                                message: t("POST_HEADING_MIN_ERROR")
                                                              }
                                                            ,
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
                                                <h5>{t("ADVERT_DESCRIPTION")}</h5>
                                                <Form.Group >
                                                    <Form.Control as="textarea"
                                                      maxlength="200"
                                                        {...register("description", {
                                                            required: {
                                                                value: true,
                                                                message: t("INCLUDE_DESCRIPTION"),
                                                            }, minLength: {
                                                                value: 3,
                                                                message: t("POST_Description_MIN_ERROR")
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
                                        {CategoryValue == 6 &&
                                            <div className="post_Add_JobType">
                                                <div className="headings mb-3">{t("JOB_TYPE")}</div>
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
                                                                    placeholder={t("SELECT_JOB_TYPE")}
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
                                        {CategoryValue == 6 && errors.jobType && (
                                            <div className="post_Add_Error">
                                                {t("SELECT_JOB_TYPE")}
                                            </div>
                                        )}
                                        {(CategoryValue == 7 || CategoryValue == 6) &&
                                            <div>
                                                <div className="headings ">{t("ON_HYBRID_REMOTE")}</div>
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
                                                                type="radio"
                                                                label={type.name}
                                                                value={type.id}
                                                            />
                                                        </div>
                                                    )) : ""}
                                                </div>
                                            </div>
                                        }
                                        {(CategoryValue == 7 || CategoryValue == 6) && errors.selectlocationtype && (
                                            <div className="post_Add_Error">
                                               {t("SELECT_OPTION")}
                                            </div>
                                        )}
                                        {CategoryValue == 6  &&
                                            <div >
                                                <div className="headings "> {t("EMPLOYMENT_EQUITY")}</div>
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
                                        {CategoryValue == 6  && errors.employmentenquiry && (
                                            <div className="post_Add_Error">
                                                {t("SELECT_OPTION")}
                                            </div>)}
                                        {CategoryValue == 4 ? <div className="headings mb-3"> {t("PRICE")}</div> : CategoryValue == 6 && <div className="headings mb-3">{t("RENUMERATION")}</div>}
                                        {(CategoryValue == 4 || CategoryValue == 6) &&
                                            <div className="post_Add_priceDiv">
                                                <InputGroup className="mb-3">
                                                    <DropdownButton
                                                        variant="outline-secondary"
                                                        title={currencyvalue && currencyvalue.symbol ? currencyvalue.symbol : currencies && currencies.length > 0 && currencies[0].symbol}
                                                        id="input-group-dropdown-1"
                                                    >{currencies && currencies.map((item, index) => (
                                                        <Dropdown.Item onClick={() => {setcurrencyvalue(item);setTimeout(() => {
                                                            getCurrencyid()
                                                        }, 2000); }}>{item.name}</Dropdown.Item>))}
                                                    </DropdownButton>
                                                    <Form.Group className="amount">
                                                        <Form.Control
                                                         {...register("amountvalue", CategoryValue == 4 && {
                                                            required: {
                                                                value: true,
                                                                message: t("PLEACE_ENTER_AMOUNT"),
                                                            },
                                                        })}
                                                            className="amount_Control"
                                                            type="text"
                                                            placeholder="Amount (optional)"
                                                           
                                                        />
                                                    </Form.Group>
                                                </InputGroup>
                                            </div>}
                                        {(CategoryValue == 4) && !currencyError && errors.amountvalue && <div className="post_Add_Error"> {errors.amountvalue.message}</div>}
                                        {CategoryValue == 4 && (currencyError )? <div className="post_Add_Error">{currencyError && currencyError}</div>: "" }

                                        {CategoryValue == 6 &&
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
                                                                placeholder={t("SELECT_EARNING_OPTION")}
                                                                id="earningoption" 
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
                                        { CategoryValue == 6 && errors.earningoption && <div className="post_Add_Error">{t("SELECT_EARNING_OPTION")}</div>}
                                        {(CategoryValue == 4 || CategoryValue == 6) &&

                                            <div className="negotiable mb-3">
                                                <Form.Check
                                                    {...register("negotiabl")}
                                                    className="negotiables"
                                                    type="checkbox"
                                                    label={"Negotiable"}
                                                    defaultChecked
                                                />
                                            </div>}
                                        <div className="headings mb-3">{t("LOCATION")}</div>
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
                                                            options={isDefaultCountry}
                                                            onChange={(e) => onChange(setCountryValue(e))}
                                                        value={countryValue ? countryValue :isDefaultCountry[1]}
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
                                        {countryValue && countryValue.id == 1 &&
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
                                                            options={countryValue && countryValue.id == 1 &&  country  }
                                                            onChange={(e) => onChange(setProvinceValue(e))}
                                                            placeholder={countryValue.id == 0 ? t("SELECT_COUNTRY") : countryValue.id == 1 ? t("SELECT_PROVINCE"):t("SELECT_PROVINCE")}
                                                            value={countryValue && countryValue.id == 1 && provinceValue  }
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

                                                     rules={{ required: true }}

                                                />
                                            </Form.Group>
                                        </div>}
                                        {errors.provinces && <div className="post_Add_Error">{t("SELECT_PROVINCE")}</div>}
                                        {countryValue && countryValue.id == 0 &&
                                        <div className="mb-3">
                                            <Form.Group >
                                                <Controller
                                                 control={control}
                                                    name="countriess"
                                                    render={({
                                                        field: { onChange, value, name, ref },
                                                        fieldState: { invalid, isTouched, isDirty, error },
                                                        formState,
                                                    }) => (
                                                        <Select
                                                            options={ country }
                                                            onChange={onChange}
                                                            placeholder={countryValue.id == 0 && t("SELECT_COUNTRY")}
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
                                                     rules={{ required: true }}
                                                />
                                            </Form.Group>
                                        </div>}
                                        {errors.countries && <div className="post_Add_Error">{t("SELECT_COUNTRY")}</div>}

                                        <Form.Group className="mb-3">
                                            <Form.Control
                                                type="text"
                                                placeholder={t("CITY")}
                                                {...register("city", {
                                                    required: {
                                                        value: true,
                                                        message: t("CITY"),
                                                    },
                                                })}
                                            />
                                        </Form.Group>

                                        {errors.city && (
                                            <div className="post_Add_Error">
                                                {errors.city.message}
                                            </div>
                                        )}

                                        <div className="headings ">{t("CONTACT_DETAILS")}</div>
                                        
                                            <div className="post_Add_Name">
                                                <Form.Group className="names">
                                                    <Form.Control
                                                        className="names_Control"
                                                        type="text"
                                                        placeholder={t("INPUT_FULL_NAME")}
                                                        {...register("fullName", {
                                                            required: {
                                                                value: true,
                                                                message: t("INPUT_FULL_NAME"),
                                                            },
                                                        })}
                                                    />
                                                    <div><img src={nameicon} alt={nameicon} /></div>
                                                </Form.Group>
                                            </div>
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
                                                    {...register("companyName"
                                                        )}
                                                />
                                                <div><img src={staricon} alt={staricon} /></div>
                                            </Form.Group>
                                        </div>
                                       
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
                                            <label type="button"for="uploadImage"  ><input
                                                    id="uploadImage"
                                                    name="image"
                                                    type="file"
                                                    style={{
                                                        display: "none",
                                                    }}
                                                    accept="image/*"
                                                    onChange={onImageChange}
                                                />
                                            <CustomBtn children={t("ADD_PHOTO")} type={"button"} onClick={""} ></CustomBtn>
                                                
                                                </label>
                                        </div>
                                        {profilePreview &&
                                        <div className="profileImageSet">
                                                <img src={profilePreview} />
                                                
                                            </div>}
                                        <div className="post_Add_Save">
                                            <div className="buttonAdd1">
                                                <CustomBtn  >{t("SAVE")}</CustomBtn>
                                            </div>
                                        </div>
                                        </div>}
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
