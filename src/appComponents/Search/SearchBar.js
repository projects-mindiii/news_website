import { Form } from "react-bootstrap";
import "./SearchBar.css";
import { FiSearch } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import {useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
 searchListApi
} from "../../store/slices/SearchSlice";


//-------Create a Search component--------
function SearchBar() {
    const [results, setResults] = useState();
    const { userToken } = useSelector((state) => state.user);
    //set language
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
 

  const handleSearch = async () => {
    const searchValues = {limit: 10, offset: 0, search: results}
    dispatch(searchListApi({ userToken: userToken, searchValues })).then(async (responsejson) => {
      
    });
  };

    return (
        <div className="searchBar" onClick={()=>{navigate("/search-list")}}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Control type="search" placeholder={t("Search")} onChange={(e)=>setResults(e.target.value)} />
                </Form.Group>
            <FiSearch onClick={()=>{handleSearch(); }}/>
        </div>
    )
}
export default SearchBar;

