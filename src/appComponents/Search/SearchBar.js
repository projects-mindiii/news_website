import { Form } from "react-bootstrap";
import "./SearchBar.css";
import { FiSearch } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearSearchData, searchListApi } from "../../store/slices/SearchSlice";
import { STATUS_CODES } from "../../utils/StatusCode";
import { guestUserLogin, userLogout } from "../../store/slices/UserSlice";

//-------Create a Search component--------
function SearchBar() {
  const [results, setResults] = useState();
  const { userToken } = useSelector((state) => state.user);
  //set language
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSearch = async () => {
    const searchValues = { limit: 10, offset: 0, search: results };
    dispatch(searchListApi({ userToken: userToken, searchValues })).then(
      async (responsejson) => {
        if (responsejson.status_code) {
          if (responsejson.status_code === STATUS_CODES.INVALID_TOKEN) {
            dispatch(userLogout());
            dispatch(guestUserLogin());
            navigate("/login");
          }
        } else {
          if (responsejson.status === STATUS_CODES.INVALID_TOKEN) {
            dispatch(userLogout());
            dispatch(guestUserLogin());
            navigate("/login");
          }
        }
      }
    );
  };

  useEffect(() => {
    if (location.pathname !== "/search-list") {
      setResults("");
    }
  }, [location.pathname]);

  return (
    <div
      className="searchBar"
      onClick={() => {
        navigate("/search-list");
        dispatch(clearSearchData());
      }}
    >
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control
          type="search"
          placeholder={t("Search")}
          value={results}
          onChange={(e) => setResults(e.target.value)}
        />
      </Form.Group>
      <FiSearch
        onClick={() => {
          handleSearch();
        }}
      />
    </div>
  );
}
export default SearchBar;
