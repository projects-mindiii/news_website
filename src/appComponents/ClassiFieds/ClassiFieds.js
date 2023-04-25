import "./ClassiFieds.css";
import { Row, Nav, Container, Col, Tab } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import SublyApi from "../../helpers/Api";
import { useSelector } from "react-redux";
import ClassifiedCategoryList from "./ClassifiedCategoryList";
import { STATUS_CODES } from "../../utils/StatusCode";
import { getWantedListApi,forSaleListApi } from "../../store/slices/ClassifiedSlice";
import { useDispatch} from "react-redux";

//-------Create a Deals Header component--------
function ClassiFieds() {
  const dispatch = useDispatch();
  const {forSaleTotalCount, forSaleWebList,wantedTotalCount,wantedWebList} = useSelector(
    (state) => state.classified
  );

  const { userToken } = useSelector((state) => state.user);
  
  const [shown, setShown] = useState(false);
  const [showDefaultList, setShowDefaultList] = useState(1);


  // function for classified webList
  
  useEffect(() => {
    async function getWebClassifiedLists() {
      const forSaleQuery = { limit: 10, offset: 0, type: 4 };

      const data = { "userToken":userToken, "whereQuery":forSaleQuery}
      dispatch(forSaleListApi(data)).then((responsejson)=>{
        console.log('responsejson',responsejson.payload)
      });

      const wantedQuery = { limit: 10, offset: 0, type: 2 };

      const wantedData = { "userToken":userToken, "whereQuery":wantedQuery}
      dispatch(getWantedListApi(wantedData)).then((responsejson)=>{
        console.log("response", responsejson)
      });
    }
    getWebClassifiedLists();
  }, []);

  return (
    <div className="main">
      <React.Fragment>
        <Container>
          <Row>
            <Col xs={12} sm={12} md={12} lg={6}>
              <div className="categoryButton">
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="first">
                        FOR SALE ({forSaleTotalCount})
                      </Nav.Link>
                      {shown ? (
                        <MdKeyboardArrowDown
                          onClick={() => setShown(!shown)}
                          icon="ic:baseline-keyboard-arrow-down"
                          width="24"
                          height="24"
                          color="white"
                        />
                      ) : (
                        <MdKeyboardArrowUp
                          onClick={() => setShown(!shown)}
                          icon="ic:baseline-keyboard-arrow-down"
                          width="24"
                          height="24"
                          color="black"
                        />
                      )}
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">WANTED ({wantedTotalCount})</Nav.Link>
                      {shown ? (
                        <MdKeyboardArrowDown
                          onClick={() => setShown(!shown)}
                          icon="ic:baseline-keyboard-arrow-down"
                          width="24"
                          height="24"
                          color="white"
                        />
                      ) : (
                        <MdKeyboardArrowUp
                          onClick={() => setShown(!shown)}
                          icon="ic:baseline-keyboard-arrow-down"
                          width="24"
                          height="24"
                          color="black"
                        />
                      )}
                    </Nav.Item>
                  </Nav>
                </Tab.Container>
              </div>
            </Col>
            <ClassifiedCategoryList forSaleListData={(showDefaultList==1)?forSaleWebList:wantedWebList}/>
          </Row>
        </Container>
      </React.Fragment>
    </div>
  );
}
export default ClassiFieds;
