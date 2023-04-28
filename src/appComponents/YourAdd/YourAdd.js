import "./YourAdd.css";
import { Row, Nav, Container, Col, Tab } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import CommonDataShow from "../../CommonComponent/CommonDataShow";
import WhatsappshareContact from "../../CommonComponent/WhatsappshareContact";
import { useSelector } from "react-redux";
import SublyApi from "../../helpers/Api";
import { STATUS_CODES } from "../../utils/StatusCode";
//-------Create a Deals Header component--------
function YourAdd() {
    const { userToken, currentUser, isLoading } = useSelector(
        (state) => state.user
    );
    const [yourAds, setYourAds] = useState();
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
            var requestDatas = { "limit": "", "offset": "", "type": 1, "search_by": 0, "province": "", "country": "", "city": "" };
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
            await SublyApi.getClassifiedList(requestDatas, userToken).then((responsejson) => {
                console.log(responsejson)
                if (responsejson.status_code == 500) {
                } else if (responsejson.status_code == 400) {
                } else {
                    console.log(responsejson)
                    if (responsejson.status_code == 200) {
                        setYourAds(responsejson.data.list)
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
                                <p>YOUR ADVERTS</p>
                                <div className="yourAdd_Note">
                                    <p>
                                        PLEASE NOTE -<small>All adverts are subject to approval. Adverts will be removed after 60 days. Delete or Edit your advert anytime</small>
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={6}>
                            {yourAds && yourAds.length < 1 && <h5 className="youAdd_NotShow">---  NO ADVERTS TO DISPLAY  --- </h5>}

                            {yourAds && yourAds.map((item, index) => (
                                item.approval_status == 1 &&
                                <div className="yourAdd_DataShow">
                                    <CommonDataShow yourdata={item} />
                                    <WhatsappshareContact yourdata={item} />
                                    <button className="edit_DeleteButton">EDIT / DELETE ADVERT</button>
                                </div>
                            ))}
                            {yourAds && yourAds.some(item => item.approval_status == 0) == true && <h5 className="youAdd_PendingApproval">---- PENDING APPROVAL ----</h5>}
                            {yourAds && yourAds.map((item, index) => (
                                item.approval_status == 0 &&
                                <div className="yourAdd_DataShow">
                                    <CommonDataShow yourdata={item} />
                                    <WhatsappshareContact yourdata={item} />
                                    <button className="edit_DeleteButton">EDIT / DELETE ADVERT</button>
                                    <button className="not_live">NOT LIVE - Pending Approvals</button>
                                </div>
                            ))}
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        </div>
    );
}
export default YourAdd;
