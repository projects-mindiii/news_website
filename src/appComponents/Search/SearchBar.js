import { Form } from "react-bootstrap";
import "./SearchBar.css";
import { FiSearch } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import SublyApi from "../../helpers/Api";
import { STATUS_CODES } from "../../utils/StatusCode";
import {useSelector } from "react-redux";


//-------Create a Search component--------
function SearchBar() {
    const [results, setResults] = useState();
    const { userToken } = useSelector((state) => state.user);
    //set language
    const { t } = useTranslation();

    // function searchListApi(searchValues) {
    //   let search = SERACH_REFRENCE_TYPE.CLASSIFIED;
    //     dispatch(setClassifiedFilterName(value));
   
    // }
 

  const handleSearch = async () => {
    const searchValues = {limit: 10, offset: 0, search: results}
    await SublyApi.getWebSearchList(userToken, searchValues).then((response) => {
      if (response.status_code === STATUS_CODES.SUCCESS) {
        console.log("respose",response )
       
      }
    });
  };
    return (
        <div className="searchBar">
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Control type="search" placeholder={t("Search")} onChange={(e)=>setResults(e.target.value)} />
                </Form.Group>
            </Form>
            <FiSearch onClick={handleSearch}/>
        </div>
    )
}
export default SearchBar;