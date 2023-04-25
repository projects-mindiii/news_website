import "./PostAdvert.css";
import { Row, Nav, Container, Col, Tab, FloatingLabel } from "react-bootstrap";
import Select from "react-select";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SublyApi from "../../helpers/Api";
import Form from 'react-bootstrap/Form';
//-------Create a Deals Header component--------
function PostAdvert() {
    const { userToken, currentUser, isLoading } = useSelector(
        (state) => state.user
    );
    const [categoryType, setCategoryType] = useState("")
    const [userCategory, setUserCategory] = useState(4)
    const [locationType, setLocationType] = useState("");
    const [selectLocation, setSelectLocation] = useState(1);
    const [employmentEquity, setEmploymentEquity] = useState([{ id: 1, name: "none" }, { id: 2, name: "EE/ AA Required" }])
    const [employment, setEmployment] = useState(2);
    const[earingOption,setEaringOption]=useState();
    useEffect(() => {
        async function getClassifiedLists() {
            // let requestData = new FormData();
            // requestData.append('heading',"Largest subs");
            // requestData.append('description',"Not new work have this component");
            // requestData.append('is_default_country',"1");
            // requestData.append(
            //     'country_id',""
            // );
            // requestData.append(
            //     'classified_type',1
            // );
            // requestData.append(
            //     'province',932
            // );
            // requestData.append(
            //     'city',2
            // );
            // requestData.append(
            //     'price',4000
            // );
            // requestData.append(
            //     'currency_id',""
            // );
            // requestData.append(
            //     'is_negotiable',""
            // );
            // requestData.append(
            //     "earning_options",40
            // );
            // requestData.append(
            //     'job_type',""
            // );
            // requestData.append(
            //     "job_location_type",""
            // );
            // requestData.append(
            //     "contact_name","Manish"
            // );
            // requestData.append(
            //     "email","manish@61mailinator.com"
            // );
            // requestData.append(
            //     "contact_compan",""
            // );
            // requestData.append(
            //     "dial_code",""
            // );
            // requestData.append(
            //     "country_code",""
            // );
            // requestData.append(
            //     "contact_number",""
            // );
            // requestData.append(
            //     "whatsapp_country_code",""
            // );
            // requestData.append(
            //     "whatapp_contact_number",""
            // );
            // requestData.append(
            //     "classifiedGallery",""
            // );
            // var requestDatas = { "limit": "", "offset": "", "type": 1, "search_by": 0, "province": "", "country": "", "city": "" };
            // await SublyApi.addClassifiedList(requestData, userToken).then((responsejson) => {
            //     console.log(responsejson)
            //     if (responsejson.status_code == 500) {
            //     } else if (responsejson.status_code == 400) {
            //     } else {
            //         console.log(responsejson)
            //         if (responsejson.status_code == 200) {

            //         }
            //     }
            // });
            await SublyApi.getClassiFiedMeta(userToken).then((responsejson) => {
                if (responsejson.status_code == 500) {
                } else if (responsejson.status_code == 400) {
                } else {
                    if (responsejson.status_code == 200) {
                        setCategoryType(responsejson.data.category_type);
                        setLocationType(responsejson.data.job_location_type);
                        setEaringOption(responsejson.data.earning_options)
                    }
                }
            });
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
                                        PLEASE NOTE - All adverts are subject to approval. Adverts will be removed after 60 days. Delete or Edit your advert anytime
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={6}>
                            <div>
                                <div className="post_Add_CategoryButton">
                                    <button className="post_Add">CATEGORY</button>
                                    <Form className="post_AddForm">
                                        <div className="post_Add_CategoryType">
                                            {categoryType ? categoryType.map((type, index) => (
                                                <div key={index} className="mb-3">
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
                                        <button >AD DETAILS</button>
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
                                            <div>
                                                <h5>JOB TYPE</h5>
                                                <Form.Group className="mb-3">
                                                    <Select
                                                        placeholder="SELECT JOB TYPE"
                                                        id="location" name="location"
                                                        styles={{
                                                            placeholder: () => ({
                                                                fontSize: "15px",
                                                                color: "white",
                                                                position: "absolute",
                                                                top: "8px",
                                                                left: "15px",
                                                            }),
                                                        }}
                                                    />
                                                </Form.Group></div>}
                                        {(userCategory == 7 || userCategory == 6) &&
                                            <div>
                                                <button className="post_Add">ON SITE, HYBRID OR REMOTE?</button>
                                                <div className="post_Add_Locationtype">
                                                    {locationType ? locationType.map((type, index) => (
                                                        <div key={index} className="mb-3">
                                                            <Form.Check
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
                                                <button className="post_Add">ON SITE, HYBRID OR REMOTE?</button>
                                                <div className="post_Add_Locationtype">
                                                    {employmentEquity ? employmentEquity.map((type, index) => (
                                                        <div key={index} className="mb-3">
                                                            <Form.Check
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
                                            <div>
                                               {(userCategory == 4) ? <h5>PRICE</h5> : <button className="post_Add">RENUMERATION</button>}

                                                <Form.Group className="mb-3 amount">
                                                    <Form.Control
                                                        className="amounts"
                                                        type="text"
                                                        placeholder="Amount (optional)"
                                                    />
                                                    <p>R</p>
                                                </Form.Group></div>}
                                        {(userCategory == 4 || userCategory == 6) &&
                                        <div>
                                            <Form.Group className="mb-3">
                                                <Select
                                                  options={earingOption ? earingOption : {}}
                                                    placeholder="SELECT EARNING OPTION"
                                                    id="earningoption" name="earningoption"
                                                    styles={{
                                                        placeholder: () => ({
                                                            fontSize: "15px",
                                                            color: "white",
                                                            position: "absolute",
                                                            top: "8px",
                                                            left: "15px",
                                                        }),
                                                    }}
                                                    
                                                />
                                            </Form.Group>
                                            </div>}
                                        {(userCategory == 4 ||userCategory == 6) &&
                                            ['checkbox'].map((type) => (
                                                <div className="mb-3 negotiable">
                                                    <Form.Check 
                                                    className="negotiables"
                                                    checked={type == "checkbox"}
                                                        type="checkbox"
                                                        label={"Negotiable"}
                                                    />
                                                </div>
                                            ))}
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
