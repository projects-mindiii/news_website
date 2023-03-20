import { Form } from "react-bootstrap";
import "./SearchBar.css";
import { FiSearch } from "react-icons/fi";

//-------Create a Search component--------
function SearchBar() {
    return (
        <div className="searchBar">
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Control type="search" placeholder="Search" />
                </Form.Group>
            </Form>
            <FiSearch />
        </div>
    )
}
export default SearchBar;