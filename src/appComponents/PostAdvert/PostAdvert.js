import "./PostAdvert.css";
import { Row, Container, Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SublyApi from "../../helpers/Api";
import Form from 'react-bootstrap/Form';
import { Toast } from "../../utils/Toaster";
import { Icon } from '@iconify/react';
import CommonEmailField from "../../formComponent/CommonInputFields/CommonEmailField";
import { useForm, Controller, useController } from "react-hook-form";
import nameicon from "../../assets/images/Deal_icon/support_ico.png";
import staricon from "../../assets/images/Deal_icon/star_ico.png";
import WatsappInput from "../../formComponent/CommonInputFields/WatsappInput";
import ContactInput from "../../formComponent/CommonInputFields/ContactInput";
import CustomBtn from "../../formComponent/Button/Button";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from 'react-bootstrap/InputGroup';
import { useTranslation } from "react-i18next";
import { CLASSIFIED_CATEGORY_TYPE } from "../../utils/Constants";
import { BsTrash3 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { STATUS_CODES } from "../../utils/StatusCode";
import Loader from "../../utils/Loader/Loader";
import { useLocation } from "react-router-dom";
import NoteBoxModule from "../CommonModule/NoteBoxModule";
import { guestUserLogin, userLogout, userDetails } from "../../store/slices/UserSlice";


//-------Create a Deals Header component--------
function PostAdvert() {
    const dispatch = useDispatch();
    const { userToken, currentUser, allMetaList } = useSelector(
        (state) => state.user
    );
    const location = useLocation();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setValue, reset,
        control,
        formState: { errors },
    } = useForm();
    const { field: heading } = useController({
        control,
        name: 'heading',
    });
    const { field: description } = useController({
        control,
        name: 'description'
    });

    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false)
    const [profilePreview, setProfilePreview] = useState([])
    const [profileImage, setProfileImage] = useState([]);
    const [orignalImage, setOrignalImage] = useState([]);
    const [showHead, setShowHead] = useState(false);
    const [cropper, setCropper] = useState("");
    const [watsappNo, setWatsappNo] = useState("");
    const [image, setImage] = useState(null);
    const [dialCodeWatsapp, setDialCodeWatsapp] = useState("27");
    const [countryCodeWatsapp, setCountryCodeWatsapp] = useState("za");
    const [phoneNo, setPhoneNo] = useState("");
    const [dialCode, setDialCode] = useState("27");
    const [countryCode, setCountryCode] = useState("za");
    const [categoryType, setCategoryType] = useState("")
    const [locationType, setLocationType] = useState("");
    const [employmentEquity, setEmploymentEquity] = useState([{ id: 1, name: "none" }, { id: 2, name: "EE/ AA Required" }])
    const [earingOptions, setEaringOptions] = useState();
    const [currenciesOptions, setCurrenciesOptions] = useState();
    const [currencyValue, setCurrencyValue] = useState();
    const [jobTypeOptions, setJobTypeOptions] = useState();
    const [CategoryValue, setCategoryValue] = useState();
    const [countryOptions, setCountryOptions] = useState();
    const [isDefaultCountry, setIsDefaultCountry] = useState([{
        label: `${t("OUTOF_SOUTH")}`,
        value: 0,
        id: 0
    }, {
        label: `${t("SOUTH_AFRICA_SET")}`,
        value: 1,
        id: 1
    }]);
    const [headingLength, setHeadingLength] = useState();
    const [descriptionLength, setDescriptionLength] = useState();
    const [defaultCountry, setDefaultCountry] = useState();
    const [provinceOptions, setProvincesOptions] = useState();
    const [provinceValue, setProvinceValue] = useState();
    const [jobTypeValue, setJobTypeValue] = useState();
    const [earningOptionValue, setEaringOptionValue] = useState();
    const [countryValue, setCountryValue] = useState()
    //----- state for manage show/hide modal-----
    const [showPopup, setShowPopup] = useState(false);
    const [removeImage, setRemoveImage] = useState("");
    //----- for close modal-----
    const handleClose = () => setShowPopup(false);
    //----- for show modal-----
    const handleShow = () => setShowPopup(true);


    function handleResponse(responsejson) {
        if (responsejson.status_code) {
            if (responsejson.status_code == STATUS_CODES.SUCCESS) {
                Toast.fire({
                    icon: "success",
                    title: responsejson.message,
                });
                navigate("/your-add");
            } else {
                if (responsejson.status_code === STATUS_CODES.INVALID_TOKEN) {
                    Toast.fire({
                        icon: "error",
                        title: t("SESSION_EXPIRE"),
                    });
                    dispatch(userLogout());
                    dispatch(guestUserLogin());
                    navigate("/login");
                } else {
                    Toast.fire({
                        icon: "error",
                        title: responsejson.message,
                    });
                }
            }
        } else {
            if (responsejson.status === STATUS_CODES.INVALID_TOKEN) {
                Toast.fire({
                    icon: "error",
                    title: t("SESSION_EXPIRE"),
                });
                dispatch(userLogout());
                dispatch(guestUserLogin());
                navigate("/login");
            } else {
                Toast.fire({
                    icon: "error",
                    title: responsejson.data.message,
                });
            }
        }
    }

    function setNewDefaultCountry(e) {
        setValue("isDefaultCountry", { label: e.label, value: e.value, id: e.id })
        setDefaultCountry({ label: e.label, value: e.value, id: e.id })
    }

    function setNewJob(e) {
        setValue("jobType", { label: e.label, value: e.value, id: e.id })
        setJobTypeValue({ label: e.label, value: e.value, id: e.id })
    }
    function setNewEarning(e) {
        setValue("earningoption", { label: e.label, value: e.value, id: e.id })
        setEaringOptionValue({ label: e.label, value: e.value, id: e.id })
    }
    function setNewCountry(e) {
        setValue("country", { label: e.label, value: e.value, id: e.id })
        setCountryValue({ label: e.label, value: e.value, id: e.id })

    }
    function setNewProvinces(e) {
        setValue("province", { label: e.label, value: e.value, id: e.id })
        setProvinceValue({ label: e.label, value: e.value, id: e.id })
    }
    function resetDate() {
        setHeadingLength("")
        setDescriptionLength("")
        reset();
        setWatsappNo("");
        setPhoneNo("");
        if (location.state !== null) {
            navigate("/post-advert", { state: "" })
        }
        setCategoryValue("");
    }

    useEffect(() => {
        async function getClassifiedLists() {
            if (Object.keys(allMetaList).length > 0) {
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
                    setCategoryValue(allMetaList.category_type[0].id)
                    setLocationType(allMetaList.job_location_type);
                    await setEaringOptions(earningOption);
                    await setJobTypeOptions(jobType);
                    await setCountryOptions(countyryOption);
                    await setProvincesOptions(provinceOption)
                    await setCurrenciesOptions(currencyoption)

                    if (location && location.state == null) {
                        dispatch(userDetails(userToken)).then((responsejson) => {
                            const response = responsejson.payload;
                            if (response.status_code === STATUS_CODES.SUCCESS) {
                                setValue(
                                    "fullName",
                                    response.data[0].name ? response.data[0].name : ""
                                );
                                setValue("email", response.data[0].email ? response.data[0].email : "");
                                setValue("city", response.data[0].city ? response.data[0].city : "");
                                setValue("companyName", response.data[0].company_name ? response.data[0].company_name : "");


                                setDialCodeWatsapp(response.data[0].whatsapp_dail_code ? response.data[0].whatsapp_dail_code : "27");
                                setWatsappNo(response.data[0].whatapp_contact_number ? response.data[0].whatapp_contact_number : "");
                                setCountryCodeWatsapp(response.data[0].whatsapp_country_code ? response.data[0].whatsapp_country_code : "za");

                                setDialCode(response.data[0].dial_code
                                    ? response.data[0].dial_code
                                    : "27");
                                setPhoneNo(response.data[0].contact
                                    ? response.data[0].contact
                                    : "");
                                setCountryCode(response.data[0].country_code
                                    ? response.data[0].country_code
                                    : "za");


                                if(response.data[0].is_default_country==1){
                                    setValue("isDefaultCountry", {
                                        label: `${t("SOUTH_AFRICA_SET")}`,
                                        value: 1,
                                        id: 1
                                    })
                                    setDefaultCountry({
                                        label: `${t("SOUTH_AFRICA_SET")}`,
                                        value: 1,
                                        id: 1
                                    })
                                }else{ 
                                    setValue("isDefaultCountry", {
                                        label: `${t("OUTOF_SOUTH")}`,
                                        value: 0,
                                        id: 0
                                    })
                                    setDefaultCountry({
                                        label: `${t("OUTOF_SOUTH")}`,
                                        value: 0,
                                        id: 0
                                    })
                                }
                                
                                if(response.data[0].provinces && response.data[0].provinces>0){
                                    const newProvinceOption = provinceOption.find(
                                        (item) => item.id === response.data[0].provinces
                                    );
                                    setNewProvinces(newProvinceOption);
                                }else{
                                    setNewProvinces({ label: 'Selected Province', value: "", id: "" })
                                }

                               
                                if(response.data[0].country_id && response.data[0].country_id>0){
                                    const newCountryOption = countyryOption.find(
                                        (item) => item.id === response.data[0].country_id
                                    );
                                    setNewCountry(newCountryOption);
                                }else{
                                    setNewCountry({ label: 'Selected Country', value: "", id: "" })
                                }
                            }
                        });
                    }
                    else {
                        
                        setValue("categorytype", location.state.category_type_id && location.state.category_type_id.toString())
                        setCategoryValue(location.state.category_type_id && location.state.category_type_id.toString())
                        setValue("fullName", location.state.user_name)
                        setValue("heading", location.state.heading)
                        setValue("description", location.state.description)
                        setValue("amountvalue", location.state.amount)
                        setValue("negotiable", location.state.is_negotiable)
                        setValue("city", location.state.city)
                        setValue("companyName", location.state.contact_company)
                        setValue("email", location.state.email)
                        setDialCodeWatsapp(location.state.whatsapp_dail_code)
                        setCountryCodeWatsapp(location.state.whatsapp_country_code)
                        setWatsappNo(location.state.whatapp_contact_number)
                        setPhoneNo(location.state.contact)
                        setDialCode(location.state.dial_code)
                        setCountryCode(location.state.country_code)
                        setValue("employmentenquiry", location.state.emp_equity && location.state.emp_equity.toString())
                        setValue("selectlocationtype", location.state.job_location_type_id)
                        setProfileImage(location.state.gallery)
                        setProfilePreview(location.state.gallery)
                        if (location.state.job_type_id) {
                            setValue("jobType", {
                                label: location.state.job_type_name,
                                value: location.state.job_type_id,
                                id: location.state.job_type_id
                            })
                            setJobTypeValue({
                                label: location.state.job_type_name,
                                value: location.state.job_type_id,
                                id: location.state.job_type_id
                            })
                        }
                        if (location.state.is_default_country == 1) {
                            setValue("isDefaultCountry", {
                                label: `${t("SOUTH_AFRICA_SET")}`,
                                value: 1,
                                id: 1
                            })

                            setDefaultCountry({
                                label: `${t("SOUTH_AFRICA_SET")}`,
                                value: 1,
                                id: 1
                            })
                        }
                        else {
                            setValue("isDefaultCountry", {
                                label: `${t("SOUTH_AFRICA_SET")}`,
                                value: 0,
                                id: 0
                            })

                            setDefaultCountry({
                                label: `${t("SOUTH_AFRICA_SET")}`,
                                value: 0,
                                id: 0
                            })
                        }

                        if (location.state.is_default_country == 1) {
                            setNewProvinces({ label: location.state.province_name, value: location.state.province_id, id: location.state.province_id })
                        }
                        else {
                            // setNewProvinces({ label: 'Selected Province', value: "", id: "" })
                            setNewCountry({ label: location.state.country_name, value: location.state.country_id, id: location.state.country_id })
                        }

                        if (location.state.earning_option_id) {
                            setValue("earningoption", { id: location.state.earning_option_id, name: location && location.state.earning_option_id, label: location.state.earning_name })
                            setEaringOptionValue({ id: location.state.earning_option_id, name: location && location.state.earning_option_id, label: location.state.earning_name })
                        }

                        setCurrencyValue({ id: location.state.currency_id, name: location.state.currency_name, symbol: location.state.currency_symbol, code: location.state.currency_code })

                    }
                }
            }
        }
        getClassifiedLists();
    }, []);
    async function onSubmit(data, e) {

        setIsLoading(true)
        let requestData = new FormData();
        requestData.append('heading', data.heading ? data.heading : "");
        requestData.append('description', data.description ? data.description : "");
        requestData.append('is_default_country', data.isDefaultCountry.id && data.isDefaultCountry.id == 0 ? 0 : data.isDefaultCountry.id
        );
        requestData.append(
            'country_id', data.isDefaultCountry.id == 0 ? data.country.id : data.isDefaultCountry.id == 1 ? 204 : ""
        );
        requestData.append(
            'classified_type', data.categorytype ? data.categorytype : ""
        );
        {
            (data.categorytype == CLASSIFIED_CATEGORY_TYPE.JOBSEEKERS || data.categorytype == CLASSIFIED_CATEGORY_TYPE.JOBOFFER) &&
                requestData.append(
                    'emp_equity', data.employmentenquiry ? data.employmentenquiry : ""
                );
        }
        requestData.append(
            'province', data.isDefaultCountry.id == 1 ? data.province.id : ""
        );
        requestData.append(
            'city', data.city ? data.city : ""
        );
        {
            (data.categorytype == CLASSIFIED_CATEGORY_TYPE.FORSALE || data.categorytype == CLASSIFIED_CATEGORY_TYPE.JOBOFFER) &&
                requestData.append(
                    'currency_id', currencyValue && currencyValue.id ? currencyValue.id : 154
                );
        }
        {
            (data.categorytype == CLASSIFIED_CATEGORY_TYPE.FORSALE || data.categorytype == CLASSIFIED_CATEGORY_TYPE.JOBOFFER) &&
                requestData.append(
                    'is_negotiable', data.negotiable == true ? 1 : 0
                );
        }
        {
            (data.categorytype == CLASSIFIED_CATEGORY_TYPE.JOBSEEKERS || data.categorytype == CLASSIFIED_CATEGORY_TYPE.JOBOFFER) &&
                requestData.append(
                    "job_location_type", data.selectlocationtype ? data.selectlocationtype : ""
                );
        }
        {
            (data.categorytype == CLASSIFIED_CATEGORY_TYPE.FORSALE || data.categorytype == CLASSIFIED_CATEGORY_TYPE.JOBOFFER) &&
                requestData.append(
                    'price', data.amountvalue ? data.amountvalue : ""
                );
        }
        {
            data.categorytype == CLASSIFIED_CATEGORY_TYPE.JOBOFFER &&
                requestData.append(
                    "earning_options", data.earningoption && data.earningoption.id ? data.earningoption.id : ""
                )
        }
        {
            data.categorytype == CLASSIFIED_CATEGORY_TYPE.JOBOFFER &&
                requestData.append(
                    'job_type', data.jobType ? data.jobType.id : ""
                );
        }
        requestData.append(
            "contact_name", data.fullName ? data.fullName : ""
        );
        requestData.append(
            "email", data.email ? data.email : ""
        );
        requestData.append(
            "contact_company", data.companyName ? data.companyName : ""
        );
        requestData.append(
            "dial_code", dialCode ? dialCode : ""
        );
        requestData.append(
            "country_code", countryCode ? countryCode : ""
        );
        requestData.append(
            "contact_number", phoneNo ? phoneNo : ""
        );
        requestData.append(
            "whatsapp_country_code", countryCodeWatsapp ? countryCodeWatsapp : "");
        requestData.append(
            "whatapp_contact_number", watsappNo ? watsappNo : ""
        );
        requestData.append(
            "whatsapp_dail_code", dialCodeWatsapp ? dialCodeWatsapp : ""
        );
        if (profileImage && profileImage.length > 0) {
            profileImage.forEach((item, index) => {
                requestData.append('classifiedGallery', item)
            })
        }
        else {
            requestData.append('classifiedGallery', "")
        }

        if (orignalImage && orignalImage.length > 0) {
            orignalImage.forEach((item, index) => {
                requestData.append('classifiedGalleryOriginal', item)
            })
        }
        else {
            requestData.append('classifiedGalleryOriginal', "")
        }

        if (location.state !== null) {
            requestData.append(
                "id", location.state.id ? location.state.id : ""
            );
        }
        if (location.state !== null) {
            requestData.append(
                "removeImgId", (removeImage) ? removeImage : ""
            );
        }


        if (location.state == null) {
            await SublyApi.addClassifiedList(requestData, userToken).then(async (responsejson) => {
                setIsLoading(false)
                handleResponse(responsejson);
            });
        }
        else {
            await SublyApi.updateAdvert(requestData, userToken).then(async (responsejson) => {
                setIsLoading(false)
                handleResponse(responsejson);
            });
        }
    }
    async function deleteClassiFieds(id) {
        setIsLoading(true)
        await SublyApi.deleteClassiFied(userToken, id).then((responsejson) => {
            handleResponse(responsejson);
        });
    }
    const uploadImage = (e) => {
        const setorignal = [...orignalImage];
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        setorignal.push(e.target.files[0])
        setOrignalImage(setorignal)
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
            // setOrignalImage()
        };
        reader.readAsDataURL(files[0]);
    };

    const imgCropper = () => {
        showHead ? setShowHead(false) : setShowHead(true);
    };

    const getCropData = () => {
        let profileviews = [...profilePreview];
        let profileimages = [...profileImage];
        if (typeof cropper !== "undefined") {
            let cropData = cropper
                .getCroppedCanvas({
                    width: 150,
                    height: 150,
                    maxWidth: 150,
                    maxHeight: 150,
                })
                .toDataURL();
            var block = cropData.split(";");
            // Get the content type of the image
            var contentTypes = block[0].split(":")[1]; // In this case "image/png"
            // get the real base64 content of the file
            var realData = block[1].split(",")[1];
            var blobImg = b64toBlob(realData, contentTypes);
            profileviews.push({ img_url: cropData });
            profileimages.push(blobImg);
            setProfilePreview(profileviews);
            setProfileImage(profileimages);
        }
    };
    function b64toBlob(cropData, contentType, sliceSize) {
        contentType = contentType || "";
        sliceSize = sliceSize || 512;
        var byteCharacters = window.atob(cropData); //decode string
        var byteArrays = [];
        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);
            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        var blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }


    async function onImageRemove(e, index, item) {
        e.preventDefault();
        let profileviews = [...profilePreview];
        let remiveImageArray = [...removeImage]
        let profileimages = [...profileImage];
        profileviews.splice(index, 1);
        profileimages.splice(index, 1);
        setProfilePreview(profileviews);
        setProfileImage(profileimages);
        if (item.id && item.id !== "") {
            remiveImageArray.push(item.id)
            setRemoveImage(remiveImageArray)
        }

    }


    return (
        <div className="main">
            {isLoading === true ? (
                <Loader />
            ) : ""}
            <React.Fragment >
                <Container>
                    <Row>
                        <Col xs={12} sm={12} md={12} lg={6}>
                            <NoteBoxModule
                                headText={t("POST_CLASSIFIED_AD")}
                                headSubText={t("PLEASE_NOTE")}
                                detailText={t("ALL_ADVERT_REMOVE_60")}
                            />
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={6}>
                            <div className="post_Add_CategoryButton">
                                <div className="headings">{t("CATEGORY")}</div>
                                <Form className="post_AddForm" onSubmit={handleSubmit(onSubmit)}>
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
                                                    defaultChecked={index === 0}
                                                />
                                            </div>
                                        )) : ""}
                                    </div>
                                    {errors.categorytype && (
                                        <div className="post_Add_Error">
                                            {errors.categorytype.message}
                                        </div>
                                    )}

                                    {CategoryValue && <div>
                                        <div className="mb-3">
                                            <div className="headings mb-3" >{t("ADD_DETAIL")}</div>
                                            <div>
                                                <div className="post_Add_Heading_Flex"><div><h5>{t("ADVERT_HEADING")}</h5></div><div><p
                                                >{headingLength ? 80 - headingLength : 80}</p></div></div>

                                                <Form.Group >
                                                    <Form.Control
                                                        className="heading"
                                                        type="text"
                                                        maxLength="80"
                                                        placeholder={t("ENTER_HEAD")}
                                                        {...register("heading", {
                                                            required: {
                                                                value: true,
                                                                message: t("ADD_ADEVERT_TITLE"),
                                                            },
                                                            minLength: {
                                                                value: 3,
                                                                message: t("POST_HEADING_MIN_ERROR")
                                                            }
                                                            ,
                                                        })}
                                                        value={heading.value}
                                                        onChange={(e) => { heading.onChange(e); setHeadingLength(e.target.value.length) }}

                                                    />
                                                </Form.Group>
                                            </div>
                                            {errors.heading && (
                                                <div className="post_Add_Error">
                                                    {errors.heading.message}
                                                </div>
                                            )}
                                            <div className="mt-3">
                                                <div className="post_Add_Heading_Flex"><div> <h5>{t("ADVERT_DESCRIPTION")}</h5></div><div><p >{descriptionLength ? 2000 - descriptionLength : 2000}</p>
                                                </div></div>

                                                <Form.Group >
                                                    <Form.Control as="textarea"
                                                        maxLength="2000"
                                                        {...register("description", {
                                                            required: {
                                                                value: true,
                                                                message: t("INCLUDE_DESCRIPTION"),
                                                            }, minLength: {
                                                                value: 3,
                                                                message: t("POST_Description_MIN_ERROR")
                                                            },
                                                        })}
                                                        value={description.value}
                                                        onChange={(e) => { description.onChange(e); setDescriptionLength(e.target.value.length) }}
                                                        className="post_Add_Discription" placeholder={t("ENTER_DISCRIPT")} />

                                                </Form.Group>
                                            </div>
                                            {errors.description && (
                                                <div className="post_Add_Error">
                                                    {errors.description.message}
                                                </div>
                                            )}

                                        </div>
                                        {CategoryValue == CLASSIFIED_CATEGORY_TYPE.JOBOFFER &&
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
                                                                <div className="selectOptionPost">
                                                                    <Select
                                                                        id="jobtype"
                                                                        placeholder={t("SELECT_JOB_TYPE")}
                                                                        options={jobTypeOptions}
                                                                        onChange={(e) => setNewJob(e)} // send value to hook form
                                                                        value={jobTypeValue ? jobTypeValue : ""}
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
                                                                </div>
                                                            )}
                                                            rules={{ required: true }}
                                                        />
                                                    </Form.Group></div></div>}
                                        {CategoryValue == CLASSIFIED_CATEGORY_TYPE.JOBOFFER && errors.jobType && (
                                            <div className="post_Add_Error">
                                                {t("SELECT_JOB_TYPE")}
                                            </div>
                                        )}
                                        {(CategoryValue == CLASSIFIED_CATEGORY_TYPE.JOBSEEKERS || CategoryValue == CLASSIFIED_CATEGORY_TYPE.JOBOFFER) &&
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
                                        {(CategoryValue == CLASSIFIED_CATEGORY_TYPE.JOBSEEKERS || CategoryValue == CLASSIFIED_CATEGORY_TYPE.JOBOFFER) && errors.selectlocationtype && (
                                            <div className="post_Add_Error">
                                                {t("SELECT_OPTION")}
                                            </div>
                                        )}
                                        {CategoryValue == CLASSIFIED_CATEGORY_TYPE.JOBOFFER &&
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
                                        {CategoryValue == CLASSIFIED_CATEGORY_TYPE.JOBOFFER && errors.employmentenquiry && (
                                            <div className="post_Add_Error">
                                                {t("SELECT_OPTION")}
                                            </div>)}
                                        {CategoryValue == CLASSIFIED_CATEGORY_TYPE.FORSALE ? <div className="headings mb-3"> {t("PRICE")}</div> : CategoryValue == CLASSIFIED_CATEGORY_TYPE.JOBOFFER && <div className="headings mb-3">{t("RENUMERATION")}</div>}
                                        {(CategoryValue == CLASSIFIED_CATEGORY_TYPE.FORSALE || CategoryValue == CLASSIFIED_CATEGORY_TYPE.JOBOFFER) &&
                                            <div className="post_Add_priceDiv">
                                                <InputGroup className="mb-3 dropdown_menu">
                                                    <DropdownButton
                                                        variant="outline-secondary"
                                                        title={currencyValue && currencyValue.symbol !== "" ? currencyValue.symbol : currenciesOptions && currenciesOptions.length > 0 && currenciesOptions[0].symbol}
                                                        id="input-group-dropdown-1"
                                                    >{currenciesOptions && currenciesOptions.map((item, index) => (
                                                        <Dropdown.Item active={currencyValue ?  currencyValue.name == item.name : index==0} onClick={() => {
                                                            setCurrencyValue(item);
                                                        }}>{item.name}</Dropdown.Item>))}
                                                    </DropdownButton>
                                                    <Form.Group className="amount">
                                                        <Form.Control
                                                            {...register("amountvalue", CategoryValue == CLASSIFIED_CATEGORY_TYPE.FORSALE && {
                                                                required: {
                                                                    value: true,
                                                                    message: t("PLEACE_ENTER_AMOUNT"),
                                                                },
                                                            })}
                                                            className="amount_Control"
                                                            type="text"
                                                            placeholder={t("AMOUNT_OPTIONAL")}

                                                        />
                                                    </Form.Group>
                                                </InputGroup>
                                            </div>}
                                        {(CategoryValue == CLASSIFIED_CATEGORY_TYPE.FORSALE) && errors.amountvalue && <div className="post_Add_Error"> {errors.amountvalue.message}</div>}
                                        {CategoryValue == CLASSIFIED_CATEGORY_TYPE.JOBOFFER &&
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
                                                            <div className="selectOptionPost">
                                                                <Select
                                                                    id="earningoption"
                                                                    options={earingOptions}
                                                                    value={earningOptionValue ? earningOptionValue : ""}
                                                                    onChange={(e) => setNewEarning(e)} // send value to hook form
                                                                    placeholder={t("SELECT_EARNING_OPTION")}
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
                                                            </div>
                                                        )}
                                                        rules={{ required: true }}
                                                    />
                                                </Form.Group>
                                            </div>}
                                        {CategoryValue == CLASSIFIED_CATEGORY_TYPE.JOBOFFER && errors.earningoption && <div className="post_Add_Error">{t("SELECT_EARNING_OPTION")}</div>}
                                        {(CategoryValue == CLASSIFIED_CATEGORY_TYPE.FORSALE || CategoryValue == CLASSIFIED_CATEGORY_TYPE.JOBOFFER) &&

                                            <div className="negotiable mb-3">
                                                <Form.Check
                                                    {...register("negotiable")}
                                                    className="negotiables"
                                                    type="checkbox"
                                                    label={"Negotiable"}
                                                    defaultChecked
                                                />
                                            </div>}
                                        <div className="headings mb-3">{t("LOCATIONS")}</div>
                                        <div className="mb-3">
                                            <Form.Group>
                                                <Controller

                                                    name="isDefaultCountry"
                                                    control={control}
                                                    render={({
                                                        field: { onChange, value, name, ref },
                                                        fieldState: { invalid, isTouched, isDirty, error },
                                                        formState,
                                                    }) => (
                                                        <div className="selectOption">
                                                            <Select
                                                                id="isDefaultCountry"
                                                                options={isDefaultCountry}
                                                                value={defaultCountry}
                                                                onChange={(e) => { setNewDefaultCountry(e) }}
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
                                                        </div>
                                                    )}
                                                />
                                            </Form.Group>
                                        </div>
                                        {(defaultCountry && defaultCountry.id == 1) &&
                                            <div className="mb-3">
                                                <Form.Group >
                                                    <Controller
                                                        control={control}
                                                        name="province"
                                                        render={({
                                                            field: { onChange, value, name, ref },
                                                            fieldState: { invalid, isTouched, isDirty, error },
                                                            formState,
                                                        }) => (
                                                            <div className="selectOption">
                                                                <Select
                                                                    id="province"
                                                                    options={provinceOptions}
                                                                    value={provinceValue}
                                                                    placeholder={t("SELECT_PROVIN")}
                                                                    onChange={(val) => { setNewProvinces(val) }}
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
                                                            </div>
                                                        )}

                                                        rules={{ required: true }}

                                                    />
                                                </Form.Group>
                                            </div>}
                                        {(defaultCountry && defaultCountry.id == 1 && errors.province) && <div className="post_Add_Error">{t("SELECT_PROVINCE")}</div>}
                                        {(defaultCountry && defaultCountry.id == 0) &&
                                            <div className="mb-3">
                                                <Form.Group >
                                                    <Controller
                                                        control={control}
                                                        name="country"
                                                        render={({
                                                            field: { onChange, value, name, ref },
                                                            fieldState: { invalid, isTouched, isDirty, error },
                                                            formState,
                                                        }) => (
                                                            <div className="selectOption">
                                                                <Select
                                                                    id="country"
                                                                    value={countryValue}
                                                                    options={countryOptions}
                                                                    onChange={(e) => { setNewCountry(e) }}
                                                                    placeholder={t("SELECT_COUNTRY")}
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
                                                            </div>
                                                        )}
                                                        rules={{ required: true }}
                                                    />
                                                </Form.Group>
                                            </div>}
                                        {(defaultCountry && defaultCountry.id == 0 && errors.country) && <div className="post_Add_Error">{t("SELECT_COUNTRY")}</div>}

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
                                                    placeholder={t("OPTINAL_COMPANY")}
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
                                            <label htmlFor="imgUpdate"  >
                                                <div>{t("ADD_PHOTOS")}</div>
                                            </label>
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            id="imgUpdate"
                                            style={{
                                                display: "none",
                                            }}
                                            onInputCapture={imgCropper}
                                            onChange={(e) => {
                                                uploadImage(e);
                                            }}
                                        />
                                        <div className="post_Add_ImagePreview">
                                            {profilePreview ? profilePreview.map((item, index) => (
                                                <div className="Post_Add_ImageSet" key={index} >

                                                    <img src={item.img_url} alt={item} />
                                                    <Icon icon="charm:cross" color="red" width="30" height="30" onClick={(e) => onImageRemove(e, index, item)} />
                                                </div>)) : ""}</div>
                                        <div className="post_Add_Save">
                                            <div className="buttonAdd1">
                                                <CustomBtn  >{t("SAVE")}</CustomBtn>
                                            </div>
                                        </div>
                                        {location.state !== null &&
                                            <div className="post_Add_Delete" >
                                                <button type="button" onClick={() => handleShow(true)}>
                                                    <div><BsTrash3 /></div>
                                                    <div>DELETE ADVERT</div>
                                                </button>
                                            </div>}
                                    </div>}
                                </Form>
                            </div>
                        </Col>

                    </Row>
                    <Modal show={showHead} onHide={imgCropper} backdrop="static" >
                        <Modal.Header closeButton>
                            <Modal.Title>{t("ImageCrop")}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <Cropper
                                    style={{ height: 400, width: "100%" }}
                                    // initialAspectRatio={2 / 2}
                                    aspectRatio={4 / 3}
                                    guides={false}
                                    preview=".img-preview2"
                                    src={image}
                                    viewMode={1}
                                    minCropBoxHeight={150}
                                    minCropBoxWidth={150}
                                    maxCropBoxWIdth={150}
                                    maxCropBoxHeight={150}
                                    cropBoxResizable={false}
                                    background={false}
                                    responsive={true}
                                    autoCropArea={1}
                                    checkOrientation={false}
                                    center={true}
                                    scalable={false}
                                    onInitialized={(instance) => {
                                        setCropper(instance);
                                    }}
                                />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <button
                                variant="primary"

                                onClick={() => {
                                    getCropData();
                                    imgCropper();
                                }}
                            >
                                {t("Crop")}
                            </button>
                            <button variant="secondary" onClick={() => { imgCropper() }}>
                                {t("Close")}
                            </button>
                        </Modal.Footer>
                    </Modal>
                    <Modal
                        show={showPopup}
                        onHide={handleClose}
                        className="deletePopup"
                        keyboard={false}
                        backdrop="static">
                        <Modal.Header>
                            <Modal.Title>{t("ALERT")}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{t("DELETE_ADVERT")}</Modal.Body>
                        <Modal.Footer>
                            <div className="buttonAdd1">
                                <CustomBtn type="button" onClick={handleClose}>{t("CANCEL")}</CustomBtn>
                            </div>
                            <div>
                                <CustomBtn onClick={() => { deleteClassiFieds(location.state.id) }}>{t("DELETE")}</CustomBtn>
                            </div>
                        </Modal.Footer>
                    </Modal>
                </Container>
            </React.Fragment>
        </div>
    );
}
export default PostAdvert;