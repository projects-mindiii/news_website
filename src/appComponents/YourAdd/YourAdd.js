import "./YourAdd.css";
import { Row, Nav, Container, Col, Tab } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import CommonDataShow from "../../CommonComponent/CommonDataShow";
import WhatsappshareContact from "../../CommonComponent/WhatsappshareContact";
import { useSelector } from "react-redux";
import SublyApi from "../../helpers/Api";
import { STATUS_CODES } from "../../utils/StatusCode";
import ClassifiedCategoryList from "../ClassiFieds/ClassifiedCategoryList";
import { yourAdvertListApi} from "../../store/slices/ClassifiedSlice";
import { useDispatch } from "react-redux";
import { Toast } from "../../utils/Toaster";
//-------Create a Deals Header component--------
import Loader from "../../utils/Loader/Loader";
function YourAdd() {
  const dispatch = useDispatch();

    const { userToken, currentUser, isLoading } = useSelector(
        (state) => state.user
    );
    const { yourAdvertWebList, yourAdvertTotalCount} = useSelector((state) => state.classified);
    const [isLoadings, setIsLoading] = useState(false)

    useEffect(() => {
        async function getWebClassifiedLists() {
          const yourAdvertQuery = { limit: 10, offset: 0, type: 1 };
          const data = { userToken: userToken, whereQuery: yourAdvertQuery };
          dispatch(yourAdvertListApi(data)).then((responsejson) => {
           console.log('responsejsonresponsejson',responsejson)
          });      
        }
        getWebClassifiedLists();
      }, [isLoadings]);

     

    return (
        <div className="main">
             {isLoadings === true ? (
                <Loader />
            ) : ""}
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
                           <div className="postAdvertBox">
                           {yourAdvertWebList && yourAdvertWebList.length < 1 && <h5 className="youAdd_NotShow">---  NO ADVERTS TO DISPLAY  --- </h5>}
                            <ClassifiedCategoryList displayRoute="your_advert" forSaleListData={yourAdvertWebList}  classifiedDataType={4} />
                           </div>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        </div>
    );
}
export default YourAdd;
