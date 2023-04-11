import { Form } from "react-bootstrap";
import "./SearchBar.css";
import { FiSearch } from "react-icons/fi";
import { useTranslation } from "react-i18next";

//-------Create a Search component--------
function SearchBar() {
    //set language
    const { t } = useTranslation();
    return (
        <div className="searchBar">
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Control type="search" placeholder={t("Search")} />
                </Form.Group>
            </Form>
            <FiSearch />
        </div>
    )
}
export default SearchBar;